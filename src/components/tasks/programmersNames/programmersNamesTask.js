import programmersNamesQuestions from './programmersNamesQuestions.json'
import { randomArrayElem, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_ENTER, KEY_DOWN, KEY_UP } from '../../../consts/const';

const PROGRAMMERS_NAMES_TASK_HTML = require('./programmersNamesTask.html');

let result;

export class ProgrammersRightName {
	constructor() {
	  let rules = `Select the name of the person in the photo`;
	  let question = randomArrayElem(programmersNamesQuestions);
	  this.showTask(rules, question[0], question[1], question[2]);
	}
	showTask(rules, src, options, answer) {
		let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = PROGRAMMERS_NAMES_TASK_HTML;
    this.fillOptions(options);
    let image = document.querySelector('.programmers_image');
    image.src = src;
    this.elementsEvents('cel-wrapper');
    document.querySelector(".task-modal-content").classList.add('bigTaskField');
    description.innerHTML = rules;
    result = answer;
  }
  fillOptions(options) {
  	let answerOptions = document.querySelectorAll('.programmer__name');
  	for (let i = 0; i < options.length; i++) {
  		answerOptions[i].innerHTML = options[i];
  		answerOptions[i].previousElementSibling.value = options[i];
  	}
  }
  checkAnswer() {
  	let answer = taskField.querySelector(':checked') || '';
    if (answer.value === result) {
      showIfAnswerCorrect();
    } else {
      showIfAnswerWrong();
    }
  }
  elementsEvents(wrap) {
		let wrapper = document.getElementById(wrap);
    let answerButtom = document.querySelector('.btn');

    answerButtom.addEventListener('click', this.checkAnswer);

		wrapper.firstElementChild.focus();
		wrapper.firstElementChild.checked;
		let options = document.querySelectorAll('.options-label');
		Array.from(options).forEach(li => {
      li.addEventListener("keydown", (e) => {
	      if (e.which === KEY_UP && e.target !== wrapper.firstElementChild.firstElementChild) {
	        li.previousElementSibling.focus();
	        li.blur();            
		    }
				if (e.which === KEY_DOWN && e.target !== wrapper.lastElementChild) {
	        li.blur(); 
	        li.nextElementSibling.focus();                  
		    }
		    if (e.which === KEY_ENTER) {
        	this.checkAnswer();
      	}
      });
    });
  }
}

export { programmersNamesQuestions }