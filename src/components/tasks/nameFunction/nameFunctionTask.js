import nameFunctionJavaScriptQuestions from './nameFunctionQuestions/javaScript.json'
import nameFunctionCssQuestions from './nameFunctionQuestions/css.json'
import nameFunctionHTMLQuestions from './nameFunctionQuestions/html.json'
import nameFunctionCPlusPlusQuestions from './nameFunctionQuestions/c++.json'
import nameFunctionJavaQuestions from './nameFunctionQuestions/java.json'
import nameFunctionPHPQuestions from './nameFunctionQuestions/php.json'
import nameFunctionRubyQuestions from './nameFunctionQuestions/ruby.json'
import nameFunctionPython3Questions from './nameFunctionQuestions/python3.json'

import { randomArrayElem, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_ENTER } from '../../../consts/const';

const NAME_FUNCTION_TASK_HTML = require('./nameFunctionTask.html');
const SHIELD_DATA = {
  'javaScript': nameFunctionJavaScriptQuestions,
  'css': nameFunctionCssQuestions,
  'html': nameFunctionHTMLQuestions,
  'c++': nameFunctionCPlusPlusQuestions,
  'java': nameFunctionJavaQuestions,
  'php': nameFunctionPHPQuestions,
  'ruby': nameFunctionRubyQuestions,
  'python3': nameFunctionPython3Questions
}

let result;

export class NameFunction {
	constructor() {
		let {levelLanguage} = require('../../../screens/level/level');
		let thisLevelQuestions = SHIELD_DATA[levelLanguage];
		let question = randomArrayElem(thisLevelQuestions);
		let rules = `<span>Write the name of the function/keyword/other. Don't use () for functions!</span><ul>Use the following characters:<li>1. <></li><li>2. :</li><li>3. -</li></ul>`;
		this.showTask(rules, question[0], question[1]);
	}
	showTask(rules, task, answer) {
		let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = NAME_FUNCTION_TASK_HTML;
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

export { nameFunctionJavaScriptQuestions, nameFunctionCssQuestions, nameFunctionHTMLQuestions, nameFunctionCPlusPlusQuestions, nameFunctionJavaQuestions, 
	nameFunctionPHPQuestions, nameFunctionRubyQuestions, nameFunctionPython3Questions }