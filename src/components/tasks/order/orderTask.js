import orderQuestions from './orderQuestions.json';
import { showIfAnswerCorrect, showIfAnswerWrong, randomNumber } from '../../../helpers/helpers'

const ORDER_TASK_HTML = require('./orderTask.html');

let result, answerArray = [];

export class PutInRightOrder {
	constructor() {
    let rules = `Put code parts in the right order`;
    let res = orderQuestions;
    let index = randomNumber(res.length); 
    let answer = res[index]; 
    let task = _.shuffle(res[index]);
    res.splice(index, 1); 
    this.showTask(rules, task, answer);
  } 
  showTask(rules, task, answer) {
  	let text = document.getElementById('taskText');
		let description = document.getElementById('taskDesc');
    let taskField = document.getElementById('taskFieldAnswer');
    
  	text.innerHTML = ORDER_TASK_HTML;
    taskField.innerHTML = `<input type="button" class='btn task-field-btn' value="Answer">`;
    this.fillList(task);
    let answerButtom = document.querySelector('.task-field-btn');
    description.innerHTML = rules;
    result = answer;
    $(function () {
      $(".sortable").sortable();
    });
    answerButtom.addEventListener('click', this.checkAnswer);
  }
  fillList(task) {
  	let parts = document.querySelector('.sortable').children;
  	for (let i = 0; i < task.length; i++) {
  		parts[i].innerHTML = task[i];
  	}
  }
  checkAnswer() {
    let children = $('.sortable').sortable('refreshPositions').children();
    $.each(children, function () {
      answerArray.push($(this).text().trim());
    });
    if (_.isEqual(answerArray, result)) {

      answerArray = [];
      showIfAnswerCorrect();
    } else {
      answerArray = [];
      showIfAnswerWrong();
    }
  }
}

export { orderQuestions }