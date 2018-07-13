import giveTheNameQuestions from './giveTheNameQuestions.json'
import { randomArrayElem, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_ENTER } from '../../../consts/const';

const GIVE_THE_NAME_TASK_HTML = require('./giveTheNameTask.html');

let result;


export class GiveTheName {
	constructor() {
		let rules = `Write the name of what is shown in the picture (in English)`;
		let question = randomArrayElem(giveTheNameQuestions);
		this.showTask(rules, question[0], question[1]);
	}
	showTask(rules, src, answer) {
		let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = GIVE_THE_NAME_TASK_HTML;
    this.elementsEvents()
    let image = document.querySelector('.give-name__image');
    image.src = src;
    document.querySelector(".task-modal-content").classList.add('bigTaskField');   
    description.innerHTML = rules;
    result = answer;     
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

export { giveTheNameQuestions }