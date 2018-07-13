import { KEY_ENTER } from '../../../consts/const';
import { showIfAnswerCorrect, showIfAnswerWrong, randomNumber } from '../../../helpers/helpers'

const FIRST_NUMBER_TASK_HTML = require('./firstNumberTask.html');

let result;

export class FirstNumberInEquation {
	constructor() {
    let rules = `Write a number to make the equation correct`;
    let signs = [' + ', ' - ', ' * '];
    let a = randomNumber(100);
    let b = randomNumber(100);
    let sign = signs[randomNumber(3)];
    let res = eval(`${a} ${sign} ${b}`);
    let task = ` ${sign} ${b} = ${res}`;
    this.showTask(rules, task, a.toString());
  }
  showTask(rules, task, answer) {
   	let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = FIRST_NUMBER_TASK_HTML;
  	this.elementsEvents();
  	let rightPartOfEquation = document.querySelector('.right-part');
  	rightPartOfEquation.innerHTML = task;                    
    document.querySelector(".task-modal-content").classList.add('bigTaskField');    
    description.innerHTML = rules;
    result = answer; 
  }
  checkAnswer() {
    let answer = document.querySelector('.task__form_answer').value.replace(/(^\s*)|(\s*)$/g, '').toLowerCase();
    if (answer === result) {
      showIfAnswerCorrect();
    } else {
      showIfAnswerWrong();
    } 
  }
  elementsEvents() {
    let answerButtom = document.querySelector('.btn');
    answerButtom.addEventListener('click', this.checkAnswer);

  	document.querySelector('.task__form_answer').focus();
    document.querySelector('.task__form_answer').addEventListener("keydown", (e) => {
      if (e.which === KEY_ENTER) {
        this.checkAnswer();
      }
    }); 
  }
}