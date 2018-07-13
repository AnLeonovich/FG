import { KEY_ENTER } from '../../../consts/const';
import { showIfAnswerCorrect, showIfAnswerWrong, randomNumber } from '../../../helpers/helpers'

const SECOND_NUMBER_TASK_HTML = require('./secondNumberTask.html');

let result;

export class SecondNumberInEquation {
	constructor() {
    let rules = `Write a number to make the equation correct`;
    let signs = [' + ', ' - ', ' * '];
    let a = randomNumber(100);
    let b = randomNumber(100);
    let sign = signs[randomNumber(3)];
    let res = eval(`${a} ${sign} ${b}`);
    let firstPart = `${a} ${sign} `;
    let secondPart = ` = ${res}`;
    this.showTask(rules, firstPart, secondPart, b.toString());
  }
  showTask(rules, firstPart, secondPart, answer) {
   	let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = SECOND_NUMBER_TASK_HTML;
  	this.elementsEvents();
    this.fillEquation(firstPart, secondPart);
    document.querySelector(".task-modal-content").classList.add('bigTaskField');
    description.innerHTML = rules;
    result = answer; 
  }
  fillEquation(firstPart, secondPart) {
    let leftPartOfEquation = document.querySelector('.left-part');
    let resultOfEquation = document.querySelector('.result');
    leftPartOfEquation.innerHTML = firstPart;
    resultOfEquation.innerHTML = secondPart;
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