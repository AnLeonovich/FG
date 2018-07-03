import { result } from './give-task'
import { showIfAnswerCorrect, showIfAnswerWrong } from './helpers'

let answerArray = [];

export class checkAnswer {
  constructor(res) {
    this.result = res;
  }
  checkSimpleAnswer() {
    let answer = document.querySelector('.task__form_answer').value.replace(/(^\s*)|(\s*)$/g, '').toLowerCase();
    if (typeof result.result === 'string') {
      if (answer === result.result) {
        showIfAnswerCorrect();
      } else {
        showIfAnswerWrong();
      }
    }
    if (typeof result.result === 'object') {
      for (let i in result.result) {
        if (result.result[i].toLowerCase() === answer) {
          return showIfAnswerCorrect();
        }
      }
      return showIfAnswerWrong();
    }
  }
  checkSelectedAnswer() {
    let answer = taskField.querySelector(':checked') || '';
    if (answer.value === result.result) {
      showIfAnswerCorrect();
    } else {
      showIfAnswerWrong();
    }
  }
  checkDroppedAnswer() {
    let children = $('.sortable').sortable('refreshPositions').children();
    $.each(children, function () {
      answerArray.push($(this).text().trim());
    });
    if (_.isEqual(answerArray, result.result)) {
      answerArray = [];
      showIfAnswerCorrect();
    } else {
      answerArray = [];
      showIfAnswerWrong();
    }
  }
  checkFlagsAnswer() {
    let answer = document.querySelector('.selected-flag').alt || '';
    if (answer === result.result) {
      showIfAnswerCorrect();
    } else {
      showIfAnswerWrong();
    }
  }
  checkCompareNumbers() {
    let list = document.querySelector('select');
    for (let i = 0; i < list.children.length; i++) {
      if (list.children[i].selected === true) {
        console.log(list.children[i].value);
        if (list.children[i].value === result.result) {
          showIfAnswerCorrect();
        } else {
          showIfAnswerWrong();
        }
      }
    }
  }
  checkChooseAll() {    
    let options = Array.from(document.querySelectorAll('.options-checkbox__item'));
    options.forEach( option => {
      if (option.checked === true) {
        answerArray.push(option.value);
      }
    });

    if (answerArray.length !== result.result.length) {
      answerArray = [];
      showIfAnswerWrong();
    } else {
      if (JSON.stringify(answerArray) === JSON.stringify(result.result)) {
        answerArray = [];
        showIfAnswerCorrect();
      } else {
        answerArray = [];
        showIfAnswerWrong();
      }
    }
  }
}
