import enVocabulary from './englishVocabulary.json';
import { generateRandomObjProperty, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_ENTER } from '../../../consts/const';

const TRANSLATE_TASK_HTML = require('./translateENtoRUTask.html');

let result; 

export class TranslateENtoRU {
	constructor() {
    let rules = `Translate the word into russian`;
    let task = generateRandomObjProperty(enVocabulary),
      answer = enVocabulary[task];
  	this.showTask(rules, task, answer);
    delete enVocabulary[task];
  }
  showTask(rules, task, answer) {
  	let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc'); 
    let taskField = document.getElementById('taskFieldAnswer');
    
    taskField.innerHTML = TRANSLATE_TASK_HTML;
    this.elementsEvents();   
    description.innerHTML = rules;
    text.innerHTML = task;
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

export { enVocabulary }