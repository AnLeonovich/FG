import chooseAllQuestions from './chooseAllQuestions.json'
import { randomArrayElem, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_UP, KEY_DOWN } from '../../../consts/const';

const CHOOSE_ALL_TASK_HTML = require('./chooseAllTask.html');

let result, answerArray = [];

export class ChooseAllCorrectOptions {
	constructor() {
		let rules = `Read the question and choose all the correct options`;
		let question = randomArrayElem(chooseAllQuestions);
		this.showTask(rules, question[0], question[1], question[2]);
	}
	showTask(rules, task, options, answer) {
		let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = CHOOSE_ALL_TASK_HTML;
    description.innerHTML = rules;
    text.innerHTML = task;
    this.fillOptions(options);
    this.elementsEvents();
    document.querySelector(".task-modal-content").classList.add('bigTaskField');  
    result = answer;
  }
  fillOptions(options) {
  	let answerOptions = document.querySelectorAll('.option');
  	for (let i = 0; i < options.length; i++) {
  		answerOptions[i].innerHTML = options[i];
  		answerOptions[i].previousElementSibling.value = options[i];
  	}
  }
  checkAnswer() {    
    let options = Array.from(document.querySelectorAll('.options-checkbox__item'));
    options.forEach( option => {
      if (option.checked === true) {
        answerArray.push(option.value);
      }
    });

    if (answerArray.length !== result.length) {
      answerArray = [];
      showIfAnswerWrong();
    } else {
      if (JSON.stringify(answerArray) === JSON.stringify(result)) {
        answerArray = [];
        showIfAnswerCorrect();
      } else {
        answerArray = [];
        showIfAnswerWrong();
      }
    }
  }
  elementsEvents() {
		let wrapper = document.getElementById('taskFieldAnswer');
		let options = document.querySelectorAll('.options-checkbox');
		let answerButtom = document.querySelector('.btn');

		wrapper.firstElementChild.focus();

		answerButtom.addEventListener('click', this.checkAnswer);

		Array.from(options).forEach(li => {
      li.addEventListener("keydown", (e) => {
	      if (e.which === KEY_UP && e.target !== wrapper.firstElementChild.firstElementChild) {
	        li.previousElementSibling.focus();            
		    }
				if (e.which === KEY_DOWN && e.target !== wrapper.lastElementChild) {
	        li.nextElementSibling.focus();                  
		    }
      });
    });
    document.querySelector('.btn').addEventListener("keydown", (e) => {
    	if (e.which === KEY_UP) {
    		answerButtom.previousElementSibling.focus();
    	}
    });
  }
}

export { chooseAllQuestions }