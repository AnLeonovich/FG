import { randomNumber, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_ENTER } from '../../../consts/const';

const COMPARE_NUMBERS_TASK_HTML = require('./compareNumbersTask.html');

let result;

export class CompareNumbers {
  constructor() {
  	let rules = `Choose the correct sign`;
  	let firstNumber = randomNumber(100);
    let secondNumber = randomNumber(100);
    let answer;
    if (firstNumber > secondNumber) {
    	answer = ">";
    } else if (firstNumber < secondNumber) {
    	answer = "<";
    } else {
    	answer = "=";
    }
    this.showTask(rules, firstNumber, secondNumber, answer);
  }
  showTask(rules, firstNumber, secondNumber, answer) {
    let text = document.getElementById('taskText');
    let description = document.getElementById('taskDesc');
    let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = COMPARE_NUMBERS_TASK_HTML;
    description.innerHTML = rules;
    this.fillLine(firstNumber, secondNumber);
    document.querySelector(".task-modal-content").classList.add('bigTaskField');
    this.elementsEvents(); 
    result = answer;    
  }
  fillLine(firstNumber, secondNumber) {
    let firstPart = document.querySelector('.first-number');
    let secondPart = document.querySelector('.second-number');
    firstPart.innerHTML = firstNumber;
    secondPart.innerHTML = secondNumber;
  }
  checkAnswer() {
    let list = document.querySelector('select');
    for (let i = 0; i < list.children.length; i++) {
      if (list.children[i].selected === true) {
        if (list.children[i].value === result.result) {
          showIfAnswerCorrect();
        } else {
          showIfAnswerWrong();
        }
      }
    }
  }
  elementsEvents() {
    let answerButtom = document.querySelector('.btn');
    answerButtom.addEventListener('click', this.checkAnswer);

    document.querySelector('select').focus();
    document.querySelector('select').addEventListener("keydown", (e) => {
      if (e.which === KEY_ENTER) {
        document.querySelector('select').blur();
        answerButtom.focus();
      }
    });
  }
}