import { randomNumber, randomArrayElem, generateRandomObjProperty } from './helpers'
import { giveTask } from './give-task'

import vocabulary from '../../assets/vocabularies/vocabulary.json';
import audioVocabulary from '../../assets/vocabularies/audioVocabulary.json';
import vocabularyReverse from '../../assets/vocabularies/vocabularyReverse.json'
import smallQuestions from '../../assets/questions/smallQuestions.json'
import countQuestions from '../../assets/questions/countQuestions.json'
import nameQuestions from '../../assets/questions/nameTask.json'
import addWordQuestions from '../../assets/questions/addWordTask.json'
import celebritiesQuestions from '../../assets/questions/celebritiesQuestions.json'
import ddQuestions from '../../assets/questions/d&dQuestions.json'
import flagsQuestions from '../../assets/questions/flagsQuestions.json'
import chooseAllQuestions from '../../assets/questions/chooseAllQuestions.json'

let englishVocab = vocabulary.english;

export class Tasks {
  constructor() { }
  calculator() {
    let rules = `Calculate the result<br>If necessary, round the number to the nearest integer`; 
    let signs = [' + ', ' - ', ' * ', ' / '];
    let str = randomNumber(100) + signs[randomNumber(4)] + randomNumber(100); 
    let res = Math.round(eval(str)).toString();
    new giveTask().showTaskSimple(rules, str, res); 
  }
  putInRightOrder() {
    let rules = `Put code parts in the right order`;
    let res = ddQuestions;
    let index = randomNumber(res.length); 
    let answer = res[index]; 
    let task = _.shuffle(res[index]);
    res.splice(index, 1); 
    new giveTask().showTaskOrder(rules, task, answer); 
  }
  translate() {
    let rules = `Translate the word into russian`;
    let task = generateRandomObjProperty(englishVocab),
      answer = englishVocab[task];
    new giveTask().showTaskSimple(rules, task, answer);
    delete englishVocab[task];
  }
  audioTask() {
    let rules = `Write what you hear`;

    let task = generateRandomObjProperty(audioVocabulary),
      answer = audioVocabulary[task];
    new giveTask().showTaskAudio(rules, task, answer);

  }
  translateRUtoEN() {
    let rules = `Translate the word into english`;
    let task = generateRandomObjProperty(vocabularyReverse),
      answer = vocabularyReverse[task];
    new giveTask().showTaskSimple(rules, task, answer);
    delete vocabularyReverse[task];
  }
  trueAndFalseQuestions() {
    let rules = `Select if the fact is true or false`;
    let question = randomArrayElem(smallQuestions);
    new giveTask().showTrueFalseTask(rules, question[0], question[1]);
  }
  count() {
    let rules = `Read the task and write the correct number`;
    let question = randomArrayElem(countQuestions);
    new giveTask().showCountTask(rules, question[0], question[1], question[2]);
  }
  nameTheThing() {
    let rules = `Write the name of what is shown in the picture (in English)`;
    let question = randomArrayElem(nameQuestions);
    new giveTask().showCountTask(rules, null, question[0], question[1]);
  }
  firstNumberInEquation() {
    let rules = `Write a number to make the equation correct`;
    let signs = [' + ', ' - ', ' * '];
    let a = randomNumber(100);
    let b = randomNumber(100);
    let sign = signs[randomNumber(3)];
    let res = eval(`${a} ${sign} ${b}`);
    let task = ` ${sign} ${b} = ${res}`;
    new giveTask().showTaskFirstInEquation(rules, task, a.toString());
  }
  secondNumberInEquation() {
    let rules = `Write a number to make the equation correct`;
    let signs = [' + ', ' - ', ' * '];
    let a = randomNumber(100);
    let b = randomNumber(100);
    let sign = signs[randomNumber(3)];
    let res = eval(`${a} ${sign} ${b}`);
    let firstPart = `${a} ${sign} `;
    let secondPart = ` = ${res}`;
    new giveTask().showTaskSecondInEquation(rules, firstPart, secondPart, b.toString());
  }
  addWord() {
    let rules = `Insert a word to get a sentence`;
    let question = randomArrayElem(addWordQuestions);
    new giveTask().showTaskAddWord(rules, question[0], question[1], question[2]);
  }
  chooseRightName() {
    let rules = `Select the name of the person in the photo`;
    let question = randomArrayElem(celebritiesQuestions);
    new giveTask().showTaskCelebrities(rules, question[0], question[1], question[2]);
  }
  flags() {
  	let rules = `Read the quesstion and choose the correct picture`;
  	let question = randomArrayElem(flagsQuestions);
  	new giveTask().showTaskFlags(rules, question[0], question[1], question[2]);
  }
  compareNumbers() {
  	let rules = `Choose the correct sign`;
  	let firstNumber = randomNumber(100);
    let secondNumber = randomNumber(100);
    let answer;
    if (firstNumber > secondNumber) {
    	answer = ">";
    } else if (firstNumber < secondNumber) {
    	answer = "<";
    } else {
    	answer = "=";
    }
    new giveTask().showTaskCompare(rules, firstNumber, secondNumber, answer);
  }
  chooseAll() {
  	let rules = `Read the question and choose all the correct options`;
  	let question = randomArrayElem(chooseAllQuestions);
  	new giveTask().showTaskChooseAll(rules, question[0], question[1], question[2]);
  }
}

export {
  englishVocab, audioVocabulary, vocabularyReverse, smallQuestions, countQuestions, nameQuestions, addWordQuestions, celebritiesQuestions, ddQuestions
}
