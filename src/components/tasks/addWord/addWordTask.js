import addWordQuestions from './addWordQuestions.json'
import { randomArrayElem, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_ENTER } from '../../../consts/const';

const ADD_WORD_TASK_HTML = require('./addWordTask.html');

let result;

export class AddWord {
 	constructor() {
    let rules = `Insert a word to get a sentence`;
    let question = randomArrayElem(addWordQuestions);
    this.showTask(rules, question[0], question[1], question[2]);
	}
	showTask(rules, firstPart, secondPart, answer) {
		let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = ADD_WORD_TASK_HTML;
    this.elementsEvents();
    this.fillSentence(firstPart, secondPart);
    document.querySelector(".task-modal-content").classList.add('bigTaskField');
    description.innerHTML = rules;
    result = answer;
  }
  fillSentence(firstPart, secondPart) {
    let firstPartOfSentence = document.querySelector('.first-part');
    let secondPartOfSentence = document.querySelector('.second-part');
    firstPartOfSentence.innerHTML = firstPart;
    secondPartOfSentence.innerHTML = secondPart;
  }
  checkAnswer() {
    let answer = document.querySelector('.task__form_answer').value.replace(/(^\s*)|(\s*)$/g, '').toLowerCase();
    for (let i in result) {
      if (result[i].toLowerCase() === answer) {
        return showIfAnswerCorrect();
      }
    }
    return showIfAnswerWrong();  
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

export { addWordQuestions }