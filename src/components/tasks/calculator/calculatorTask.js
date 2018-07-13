import { KEY_ENTER } from '../../../consts/const';
import { showIfAnswerCorrect, showIfAnswerWrong, randomNumber } from '../../../helpers/helpers'

const CALCULATOR_TASK_HTML = require('./calculatorTask.html');

let result; 

export class Calculator {
	constructor(){
  let rules = `Calculate the result<br>If necessary, round the number to the nearest integer`; 
  let signs = [' + ', ' - ', ' * ', ' / '];
  let str = randomNumber(100) + signs[randomNumber(4)] + randomNumber(100); 
  let res = Math.round(eval(str)).toString();
  this.showTask(rules, str, res);
  }
  showTask(rules, task, answer) { 
    let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
    let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = CALCULATOR_TASK_HTML;
    this.elementsEvents();  
    description.innerHTML = rules;
    text.innerHTML = task;
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