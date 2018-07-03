import { text, description, taskField } from './create-page'
import { englishVocab, audioVocabulary } from './tasks'
import { checkAnswer } from './check-answer'
import { setVoiceGender, selectImage } from "./helpers";
import { KEY_ENTER, SYNTH as synth } from '../consts/const';

let answerButtom, rules, result;

export class giveTask {
  constructor() { }
  showTaskSimple(rules, task, answer) { 
    taskField.innerHTML = `<input type="text" class='task__form_answer' autofocus>
                           <input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which === KEY_ENTER) {
        result.checkSimpleAnswer();
      }
    });
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskAudio(rules, task, answer) {
    taskField.innerHTML = `<input type="text" class='task__form_answer' autofocus>
                           <input type="button" class='btn task-field-btn' value="Answer">`;
    let description = document.querySelector('#taskDesc'),
      text = document.querySelector('#taskText');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    text.innerHTML = `<input type="button" class='btn' id="audioBtn" value= "Click to listen">`;
    let audioBtn = $('#audioBtn');

    audioBtn.click(() => {
      let readTaskText = new SpeechSynthesisUtterance(task);
      setVoiceGender(readTaskText);
      synth.speak(readTaskText);
    });

    result = new checkAnswer(answer); 
    $(".task__form_answer").keypress(function (e) {
      if (e.which === KEY_ENTER) {
        result.checkSimpleAnswer();
      }
    });    
    answerButtom.addEventListener('click', result.checkSimpleAnswer); 
    delete audioVocabulary[task]; 
  };
  showTaskWithOptions(rules, task, options, answer) {
    taskField.innerHTML = `<label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[1]}'>${options[1]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[2]}'>${options[2]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>
                           <input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.btn');
    document.querySelector(".task-modal-content").classList.add('options');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer);
    answerButtom.addEventListener('click', result.checkSelectedAnswer);
  }
  showTaskOrder(rules, task, answer) {
    text.innerHTML = `<ul class="sortable task-filed-answer">
                        <li class="drag-item" id="id_1">${task[0]}</li>
                        <li class="drag-item" id="id_2">${task[1]}</li>
                        <li class="drag-item" id="id_3">${task[2]}</li>
                        <li class="drag-item" id="id_4">${task[3]}</li>
                        <li class="drag-item" id="id_5">${task[4]}</li>
                        <li class="drag-item" id="id_6">${task[5]}</li>
                        <li class="drag-item" id="id_7">${task[6]}</li>
                        <li class="drag-item" id="id_7">${task[7]}</li>
                        <li class="drag-item" id="id_7">${task[8]}</li>
                      </ul>`;
    taskField.innerHTML = `<input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.task-field-btn');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    $(function () {
      $(".sortable").sortable();
    });
    answerButtom.addEventListener('click', result.checkDroppedAnswer);
  }
  showTrueFalseTask(rules, task, answer) {
    taskField.innerHTML = `<label class='options-label'><input type='radio' class='task__form_options' name='answer' value='True'>True</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='False'>False</label> 
                           <input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.btn');
    document.querySelector(".task-modal-content").classList.add('options');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer);
    answerButtom.addEventListener('click', result.checkSelectedAnswer);
  }
  showCountTask(rules, task, src, answer) {
    taskField.innerHTML = `<img src=${src} class='count-task'>
                            <input type="text" class='task__form_answer' autofocus>
                            <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    if (task !== null) {
      text.innerHTML = task;
    }
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which === KEY_ENTER) {
        result.checkSimpleAnswer();
      }
    });  
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskFirstInEquation(rules, task, answer) {
    taskField.innerHTML = `<label><input type="text" class='task__form_answer math' autofocus>${task}</label>
                          <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which === KEY_ENTER) {
        result.checkSimpleAnswer();
      }
    }); 
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskSecondInEquation(rules, firstPart, secondPart, answer) {
    taskField.innerHTML = `<label>${firstPart}<input type="text" class='task__form_answer math' autofocus>${secondPart}</label>
                          <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which === KEY_ENTER) {
        result.checkSimpleAnswer();
      }
    }); 
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskAddWord(rules, firstPart, secondPart, answer) {
    taskField.innerHTML = `<label>${firstPart}<input type="text" class='task__form_answer word' autofocus>${secondPart}</label>
                          <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which === KEY_ENTER) {
        result.checkSimpleAnswer();
      }
    }); 
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskCelebrities(rules, src, options, answer) {
    taskField.innerHTML = `<img src=${src} class='celebrities-task'>
                           <div class='options-wrapper'>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[1]}'>${options[1]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[2]}'>${options[2]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>
                           <input type="button" class='btn task-field-btn' value="Answer">
                           </div>`;
    answerButtom = document.querySelector('.btn');
    document.querySelector(".task-modal-content").classList.add('countTask');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    answerButtom.addEventListener('click', result.checkSelectedAnswer);
  }
  showTaskFlags(rules, task, srcArr, answer) {
    description.innerHTML = rules;
    text.innerHTML = task;
    taskField.innerHTML = `<div class='flags__wrapper'>
                            <img src=${srcArr[0][0]} class='flag-task' alt=${srcArr[0][1]}>
                            <img src=${srcArr[1][0]} class='flag-task' alt=${srcArr[1][1]}>
                            <img src=${srcArr[2][0]} class='flag-task' alt=${srcArr[2][1]}>
                            </div>
                            <input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.btn');
    document.querySelector(".task-modal-content").classList.add('countTask');
    let options = document.querySelector('.flags__wrapper');
    Array.from(options.children).forEach(div => {
      div.addEventListener('click', selectImage)
    });
    result = new checkAnswer(answer);
    answerButtom.addEventListener('click', result.checkFlagsAnswer);
  }
  showTaskCompare(rules, firstNumber, secondNumber, answer) {
    description.innerHTML = rules;
    taskField.innerHTML = `<p>${firstNumber}
                            <select size="1">
                              <option value=">">&gt;</option>
                              <option value="<">&lt;</option>
                              <option value="=">=</option>
                            </select>
                          ${secondNumber}</p>
                          <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    result = new checkAnswer(answer);
    answerButtom.addEventListener('click', result.checkCompareNumbers);
  }
  showTaskChooseAll(rules, task, options, answer) {
    description.innerHTML = rules;
    text.innerHTML = task;
    taskField.innerHTML = `<label class="options-checkbox"><input type="checkbox"  class="options-checkbox__item" value='${options[0]}'>${options[0]}</label>
                            <label class="options-checkbox"><input type="checkbox" class="options-checkbox__item" value='${options[1]}'>${options[1]}</label>
                            <label class="options-checkbox"><input type="checkbox" class="options-checkbox__item" value='${options[2]}'>${options[2]}</label>
                            <label class="options-checkbox"><input type="checkbox" class="options-checkbox__item" value='${options[3]}'>${options[3]}</label>
                            <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    result = new checkAnswer(answer);
    answerButtom.addEventListener('click', result.checkChooseAll);
  }
}

export { result }
