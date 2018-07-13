import audioVocabulary from './audioVocabulary.json';
import { generateRandomObjProperty, showIfAnswerCorrect, showIfAnswerWrong, setVoiceGender } from '../../../helpers/helpers'
import { KEY_ENTER, KEY_DOWN, KEY_UP, SYNTH as synth } from '../../../consts/const';

const AUDIO_TASK_HTML = require('./audioTask.html');

let result; 

export class AudioTask {
	constructor() {
		let rules = `Write what you hear`;
    let task = generateRandomObjProperty(audioVocabulary),
      	answer = audioVocabulary[task];
    this.showTask(rules, task, answer);
	}
	showTask(rules, task, answer) { 
    let description = document.querySelector('#taskDesc'),
        text = document.querySelector('#taskText'),
        taskField = document.getElementById('taskFieldAnswer');

    taskField.innerHTML = AUDIO_TASK_HTML;
    description.innerHTML = rules;
    text.innerHTML = `<input type="button" class='btn' id="audioBtn" value= "Click to listen">`;   
    this.elementsEvents(task);
    result = answer;  
    delete audioVocabulary[task]; 
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
  elementsEvents(task) {
    let answerButtom = document.querySelector('.btn');
    let audioButton = document.getElementById("audioBtn");
    let answerField = document.querySelector('.task__form_answer');
    audioButton.focus();

    audioButton.addEventListener('click', () => {
      let readTaskText = new SpeechSynthesisUtterance(task);
      setVoiceGender(readTaskText);
      synth.speak(readTaskText);
    });
		
    audioButton.addEventListener("keydown", (e) => {    	
      if (e.which === KEY_DOWN) {
        audioButton.blur();
        answerField.focus();
      }
    });

    answerButtom.addEventListener('click', this.checkAnswer); 

    answerField.addEventListener("keydown", (e) => {
      if (e.which === KEY_UP) {
        answerField.blur();
        audioButton.focus();
      }  
      if (e.which === KEY_ENTER) {
        this.checkAnswer();
      }
    });
  }
}

export { audioVocabulary }