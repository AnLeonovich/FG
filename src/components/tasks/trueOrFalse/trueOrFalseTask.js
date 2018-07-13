import trueOrFalseQuestions from './trueOrFalseQuestions.json'
import { randomArrayElem, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_ENTER, KEY_DOWN, KEY_UP } from '../../../consts/const';

const TRUE_OR_FALSE_TASK_HTML = require('./trueOrFalseTask.html');

let result;

export class TrueAndFalseFact {
	constructor() {
    let rules = `Select if the fact is true or false`;
    let question = randomArrayElem(trueOrFalseQuestions);
    this.showTask(rules, question[0], question[1]);
	}
  showTask(rules, task, answer) {
  	let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');
		
    taskField.innerHTML = TRUE_OR_FALSE_TASK_HTML;
    this.elementsEvents('taskFieldAnswer');
    document.querySelector(".task-modal-content").classList.add('options');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = answer;
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
    let answerButtom = document.querySelector('.btn');
    answerButtom.addEventListener('click', this.checkAnswer);

		let wrapper = document.getElementById(wrap);
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

export { trueOrFalseQuestions }