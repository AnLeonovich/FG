import codeOutputJavaScriptQuestions from './codeOutputQuestions/javaScript.json'
import codeOutputCssQuestions from './codeOutputQuestions/css.json'
import codeOutputHTMLQuestions from './codeOutputQuestions/html.json'
import codeOutputCPlusPlusQuestions from './codeOutputQuestions/c++.json'
import codeOutputJavaQuestions from './codeOutputQuestions/java.json'
import codeOutputPHPQuestions from './codeOutputQuestions/php.json'
import codeOutputRubyQuestions from './codeOutputQuestions/ruby.json'
import codeOutputPython3Questions from './codeOutputQuestions/python3.json'

import { randomArrayElem, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_ENTER } from '../../../consts/const';

const CODE_OUTPUT_TASK_HTML = require('./codeOutputTask.html');
const ATTACK_DATA = {
  'javaScript': codeOutputJavaScriptQuestions,
  'css': codeOutputCssQuestions,
  'html': codeOutputHTMLQuestions,
  'c++': codeOutputCPlusPlusQuestions,
  'java': codeOutputJavaQuestions,
  'php': codeOutputPHPQuestions,
  'ruby': codeOutputRubyQuestions,
  'python3': codeOutputPython3Questions
}

let result;

export class CodeOutput {
	constructor() {
		let {levelLanguage} = require('../../../screens/level/level');
		let thisLevelQuestions = ATTACK_DATA[levelLanguage];
		let question = randomArrayElem(thisLevelQuestions);
		let rules = `<span>Read the tasks carefully!</span><ul>Your answer may be:<li class='rules-list'>1. number (1, 2.1)</li><li class='rules-list'>2. string (more than one word is possible)</li><li class='rules-list'>3. boolean (true/false)</li><li class='rules-list'>4. array ([1,2,3], [[1,2],[3,4]])</li></ul><span>There is not case sensitivity. Error is possible answer</span>`;
		this.showTask(rules, question[0], question[1]);
	}
	showTask(rules, task, answer) {
		let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = CODE_OUTPUT_TASK_HTML;
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

export { codeOutputJavaScriptQuestions, codeOutputCssQuestions, codeOutputHTMLQuestions, codeOutputCPlusPlusQuestions, codeOutputJavaQuestions, codeOutputPHPQuestions,
codeOutputRubyQuestions, codeOutputPython3Questions }