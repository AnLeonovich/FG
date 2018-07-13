import chooseCorrectOptionJavaScriptQuestions from './chooseCorrectOptionQuestions/javaScript.json'
import chooseCorrectOptionCssQuestions from './chooseCorrectOptionQuestions/css.json'
import chooseCorrectOptionHTMLQuestions from './chooseCorrectOptionQuestions/html.json'
import chooseCorrectOptionCPlusPlusQuestions from './chooseCorrectOptionQuestions/c++.json'
import chooseCorrectOptionJavaQuestions from './chooseCorrectOptionQuestions/java.json'
import chooseCorrectOptionPHPQuestions from './chooseCorrectOptionQuestions/php.json'
import chooseCorrectOptionRubyQuestions from './chooseCorrectOptionQuestions/ruby.json'
import chooseCorrectOptionPython3Questions from './chooseCorrectOptionQuestions/python3.json'

import { randomArrayElem, showIfAnswerCorrect, showIfAnswerWrong } from '../../../helpers/helpers'
import { KEY_ENTER, KEY_UP, KEY_DOWN } from '../../../consts/const';

const CHOOSE_CORRECT_OPTION_TASK_HTML = require('./chooseCorrectOptionTask.html');
const HEAL_DATA = {
  'javaScript': chooseCorrectOptionJavaScriptQuestions,
  'css': chooseCorrectOptionCssQuestions,
  'html': chooseCorrectOptionHTMLQuestions,
  'c++': chooseCorrectOptionCPlusPlusQuestions,
  'java': chooseCorrectOptionJavaQuestions,
  'php': chooseCorrectOptionPHPQuestions,
  'ruby': chooseCorrectOptionRubyQuestions,
  'python3': chooseCorrectOptionPython3Questions
}

let result;

export class ChooseCorrectOption {
	constructor() {
		let {levelLanguage} = require('../../../screens/level/level');
		let thisLevelQuestions = HEAL_DATA[levelLanguage];
		let question = randomArrayElem(thisLevelQuestions);
		let rules = `<span>Choose one of the options.</span>`;
		this.showTask(rules, question[0], question[1], question[2]);
	}
	showTask(rules, task, options, answer) {
		let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
		let taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = CHOOSE_CORRECT_OPTION_TASK_HTML;
    this.fillOptions(options);
    this.elementsEvents('taskFieldAnswer');  
    document.querySelector(".task-modal-content").classList.add('options');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = answer;    
  }
  fillOptions(options) {
  	let answerOptions = document.querySelectorAll('.option');
  	for (let i = 0; i < options.length; i++) {
  		answerOptions[i].innerHTML = options[i];
  		answerOptions[i].previousElementSibling.value = options[i];
  	}
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
		let wrapper = document.getElementById(wrap);
    let answerButtom = document.querySelector('.btn');

    answerButtom.addEventListener('click', this.checkAnswer);

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

export { chooseCorrectOptionJavaScriptQuestions, chooseCorrectOptionCssQuestions, chooseCorrectOptionHTMLQuestions, chooseCorrectOptionCPlusPlusQuestions, 
	chooseCorrectOptionJavaQuestions, chooseCorrectOptionPHPQuestions, chooseCorrectOptionRubyQuestions, chooseCorrectOptionPython3Questions }