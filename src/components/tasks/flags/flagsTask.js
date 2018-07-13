import flagsQuestions from './flagsQuestions.json'
import { randomArrayElem, showIfAnswerCorrect, showIfAnswerWrong, selectImage } from '../../../helpers/helpers'
import { KEY_ENTER, KEY_DOWN, KEY_LEFT, KEY_RIGHT } from '../../../consts/const';

const FLAGS_TASK_HTML = require('./flagsTask.html');

let result;

export class Flags {
	constructor() {
  	let rules = `Read the quesstion and choose the correct picture`;
  	let question = randomArrayElem(flagsQuestions);
  	this.showTask(rules, question[0], question[1], question[2]);
  }
  showTask(rules, task, srcArr, answer) {
  	let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

		taskField.innerHTML = FLAGS_TASK_HTML;
		this.fillImages(srcArr);
    description.innerHTML = rules;
    text.innerHTML = task;    
    this.elementsEvents();
    document.querySelector(".task-modal-content").classList.add('bigTaskField');
    result = answer;
  }
  fillImages(srcArr) {
  	let images = document.querySelector('.flags__wrapper').children;
  	for (let i = 0; i < srcArr.length; i++) {
  		images[i].src = srcArr[i][0];
  		images[i].alt = srcArr[i][1];
  	}
  }
  checkAnswer() {
    let answer = document.querySelector('.selected-flag').alt || '';
    if (answer === result) {
      showIfAnswerCorrect();
    } else {
      showIfAnswerWrong();
    }
  }
  elementsEvents() {
  	let wrapper = document.querySelector('.flags__wrapper');
  	let answerButtom = document.querySelector('.btn');

  	answerButtom.addEventListener('click', this.checkAnswer);

    Array.from(wrapper.children).forEach(img => {
      img.addEventListener('click', selectImage)
    });
    
		wrapper.firstElementChild.focus();
		wrapper.firstElementChild.classList.add('selected-flag');
		wrapper.addEventListener("keydown", (e) => {
  		let current = document.querySelector('.selected-flag');
			if (e.which === KEY_RIGHT) {
        if (current ===  wrapper.lastElementChild) {
           wrapper.firstElementChild.focus();
           wrapper.firstElementChild.classList.add('selected-flag');
        } else {
        	current.nextElementSibling.classList.add('selected-flag');
        	current.nextElementSibling.focus();
        }
      current.classList.remove('selected-flag');
      current.blur();
			}
			if (e.which === KEY_LEFT) {        
        if (current ===  wrapper.firstElementChild) {
           wrapper.lastElementChild.classList.add('selected-flag');
           wrapper.lastElementChild.focus();
        } else {
        	current.previousElementSibling.classList.add('selected-flag');
        	current.previousElementSibling.focus();
        }
      current.classList.remove('selected-flag');
      current.blur();
			}
			if (e.which === KEY_DOWN || e.which === KEY_ENTER){
				answerButtom.focus();
			}
		});
  }
}

export { flagsQuestions }