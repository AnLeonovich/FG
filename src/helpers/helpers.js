import { AudioTask, audioVocabulary } from '../components/tasks/audio/audioTask'
import { Calculator } from '../components/tasks/calculator/calculatorTask'
import { FirstNumberInEquation } from '../components/tasks/firstNumber/firstNumberTask'
import { SecondNumberInEquation } from '../components/tasks/secondNumber/secondNumberTask'
import { CompareNumbers } from '../components/tasks/compareNumbers/compareNumbersTask'
import { PutInRightOrder, orderQuestions } from '../components/tasks/order/orderTask'
import { TranslateENtoRU, enVocabulary } from '../components/tasks/translateENtoRU/translateENtoRUTask'
import { TranslateRUtoEN, ruVocabulary } from '../components/tasks/translateRUtoEN/translateRUtoENTask'
import { TrueAndFalseFact, trueOrFalseQuestions } from '../components/tasks/trueOrFalse/trueOrFalseTask'
import { GiveTheName, giveTheNameQuestions } from '../components/tasks/giveTheName/giveTheNameTask'
import { AddWord, addWordQuestions } from '../components/tasks/addWord/addWordTask'
import { ProgrammersRightName, programmersNamesQuestions } from '../components/tasks/programmersNames/programmersNamesTask'
import { Flags, flagsQuestions } from '../components/tasks/flags/flagsTask'
import { ChooseAllCorrectOptions, chooseAllQuestions } from '../components/tasks/chooseAll/chooseAllTask'
import { CodeOutput, codeOutputJavaScriptQuestions, codeOutputCssQuestions, codeOutputHTMLQuestions, codeOutputCPlusPlusQuestions, codeOutputJavaQuestions, 
  codeOutputPHPQuestions, codeOutputRubyQuestions, codeOutputPython3Questions } from '../components/tasks/codeOutput/codeOutputTask'
import { NameFunction, nameFunctionJavaScriptQuestions, nameFunctionCssQuestions, nameFunctionHTMLQuestions, nameFunctionCPlusPlusQuestions, 
  nameFunctionJavaQuestions, nameFunctionPHPQuestions, nameFunctionRubyQuestions, nameFunctionPython3Questions } 
  from '../components/tasks/nameFunction/nameFunctionTask'
import { ChooseCorrectOption, chooseCorrectOptionJavaScriptQuestions, chooseCorrectOptionCssQuestions, chooseCorrectOptionHTMLQuestions, 
  chooseCorrectOptionCPlusPlusQuestions, chooseCorrectOptionJavaQuestions, chooseCorrectOptionPHPQuestions, chooseCorrectOptionRubyQuestions, 
  chooseCorrectOptionPython3Questions } from '../components/tasks/chooseCorrectOption/chooseCorrectOptionTask'

import { DialogActions } from '../components/modalDialog/dialogs'
import { modal, spell } from '../screens/level/level'; 
import { MonsterAttack } from '../battle/monsterAttack';
import { PlayerAttack } from '../battle/playerAttack';
import { volume, rate } from '../components/modalNav/navigation'
import { KEY_ENTER, SYNTH as synth } from '../consts/const';
import { Spells } from '../components/modalSpells/spells'

let player, voices, doSuper;
let blitzCount = false;
let blitzPower = 0; 

class Player {
  constructor(name, character) {
    this.name = name;
    this.health = 100;
    this.character = character;
    this.shield = 0;
    this.levelPass = 0;
    this.super = 0;
  }
}

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function addRandomClass(target, sourceArray) {
  return target.addClass(sourceArray[generateRandomArrayIndex(sourceArray)]);
}

function generateRandomArrayIndex(array) {
  return _.random(0, array.length - 1, 0);
}

function randomArrayElem(arr) {
  let index = randomNumber(arr.length);
  return arr.splice(index, 1)[0];
}

function chooseLanguage(languages) {
  let index = randomNumber(languages.length);
  let language = languages.splice(index, 1).toString();
  return language;
}

function selectElement(e) {
  let current = document.querySelector('.selected');
  let elem = e.target;
  if (current) {
    current.classList.remove('selected');
  }
  if (elem.tagName === 'IMG') {
    elem = e.target.parentElement;
  };
  elem.classList.add('selected');
}

function selectImage(e) {
  let current = document.querySelector('.selected-flag');
  let elem = e.target;
  if (current) {
    current.classList.remove('selected-flag');
  }
  elem.classList.add('selected-flag');
}

function roundToTwenty(number, increment, offset) {
  return Math.ceil((number - offset) / increment) * increment + offset;
}

function generateRandomObjProperty(obj) {
  let result,
    count = 0;
  for (let prop in obj)
    if (Math.random() < 1 / ++count)
      result = prop;
  return result;
}

function createPlayer() {
  let character = document.querySelector('.selected') ? document.querySelector('.selected').id : 'hero-2';
  player = new Player(document.getElementById('name').value || 'Anonim', character);
  return player;
}

function showIfAnswerCorrect() {
  new DialogActions().writeDialogText('answer__correct', ['Correct'], 100);
  let {BC} = require('../components/modalSpells/spells');
  let text = document.getElementById('taskText');
  blitzCount = BC;
  if (blitzCount > 0) {
    blitzCount--;
    blitzPower += 20;
  }
  if (blitzCount === 0 || blitzCount === false || blitzCount === undefined) {
    setTimeout(function () {
      modal.style.display = 'none';
      text.innerHTML = '';
      document.getElementById('answer__correct').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('options');
      document.querySelector(".task-modal-content").classList.remove('bigTaskField');
      new PlayerAttack()[spell]();
      if (spell === 'super') {
            player.super = 0;
            doSuper = false;
            document.querySelector('.hero-super_scale').style.width = `${player.super}%`;
      }
      blitzCount = false;
      blitzPower = 0;
    }, 1500);
  } else {
    setTimeout(function () {
      modal.style.display = 'none';
      text.innerHTML = '';
      document.getElementById('answer__correct').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('options');
      document.querySelector(".task-modal-content").classList.remove('bigTaskField');
    }, 1000);

    setTimeout(function () {
      new Spells().blitzAttack();
    }, 1500);
  }
}

function showIfAnswerWrong() {
  new DialogActions().writeDialogText('answer__wrong', ['Wrong'], 100);
  let {BC} = require('../components/modalSpells/spells');
  let text = document.getElementById('taskText');
  blitzCount = BC;
  if (blitzCount > 0) {
    blitzCount--;
  }
  if (blitzCount === false  || blitzCount === undefined) {
    setTimeout(function () {
      modal.style.display = 'none';
      text.innerHTML = '';
      document.getElementById('answer__wrong').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('options');
      document.querySelector(".task-modal-content").classList.remove('bigTaskField');
      new MonsterAttack();
    }, 1500);
  }
  if (doSuper === true) {
    doSuper = false;
    player.super = 0;
    document.getElementById('answer__wrong').innerHTML = '';
    document.querySelector(".task-modal-content").classList.remove('options');
    document.querySelector(".task-modal-content").classList.remove('bigTaskField');
    document.querySelector('.hero-super_scale').style.width = `${player.super}%`;
  }
  if (blitzCount === 0) {
    setTimeout(function () {
      modal.style.display = 'none';
      text.innerHTML = '';
      document.getElementById('answer__wrong').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('options');
      document.querySelector(".task-modal-content").classList.remove('bigTaskField');
      new PlayerAttack()[spell]();
      blitzCount = false;
      blitzPower = 0;
    }, 1500);
  } else if (blitzCount > 0) {
    setTimeout(function () {
      modal.style.display = 'none';
      text.innerHTML = '';
      document.getElementById('answer__wrong').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('options');
      document.querySelector(".task-modal-content").classList.remove('bigTaskField');
    }, 1000);

    setTimeout(function () {
      new Spells().blitzAttack();
    }, 1500);
  }
}

function setVoiceGender(reading, gender) {
  voices = synth.getVoices();
  (gender === 'female') ? reading.voice = _.find(voices, (o) => { return o.voiceURI === "Google UK English Female"; }) : reading.voice = _.find(voices, (o) => { return o.voiceURI === "Google UK English Male"; });
}

function createReadableText(text) {
  let readableText = new SpeechSynthesisUtterance(text);
  readableText.volume = volume;
  readableText.rate = rate;
  return readableText;
}

function unblockSuperAttack() {
  document.querySelector('.super').classList.toggle('blockSuper');
  document.querySelector('.hero-super').classList.toggle('super__full');
  document.querySelector('.super').addEventListener('click', superClick);
  document.querySelector('.super').addEventListener('keydown', superAttackKey);
  }


function blockSuperAttack() {
  document.querySelector('.super').classList.toggle('blockSuper');
  document.querySelector('.hero-super').classList.toggle('super__full');
  document.querySelector('.super').removeEventListener('click', superClick);
  document.querySelector('.super').removeEventListener('keydown', superAttackKey);
}

function superAttackKey(e) {
  if (e.which === KEY_ENTER) {
      superClick();
  }
}

function superClick() {
  let spell = 'superAttack';
  doSuper = true;
  document.querySelector('.spells').classList.toggle('showSpells');
  let modal = document.getElementById('taskModal');
  modal.style.display = 'block';
  new Spells()[spell]();
}

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

function tasksForAttack(language) {
  let thisQuestions = ATTACK_DATA[language];
  if (thisQuestions.length !== 0) {
    return CodeOutput;
  } else {
    let tasks = randomTasksArray();
    return randomArrayElem(tasks);
  } 
}

function tasksForShield(language) {
  let thisQuestions = SHIELD_DATA[language];
  if (thisQuestions.length !== 0) {
    return NameFunction;
  } else {
    let tasks = randomTasksArray();
    return randomArrayElem(tasks);
  } 
}

function tasksForHeal(language) {
  let thisQuestions = HEAL_DATA[language];
  if (thisQuestions.length !== 0) {
    return ChooseCorrectOption;
  } else {
    let tasks = randomTasksArray();
    return randomArrayElem(tasks);
  } 
}

function randomTasksArray() {
  let arr = [Calculator, FirstNumberInEquation, SecondNumberInEquation, CompareNumbers];
  if (Object.keys(enVocabulary).length !== 0) {
    arr.push(TranslateENtoRU);
  }
  if (Object.keys(audioVocabulary).length !== 0) {
    arr.push(AudioTask);
  }
  if (ruVocabulary.length !== 0) {
    arr.push(TranslateRUtoEN);
  }
  if (trueOrFalseQuestions.length !== 0) {
    arr.push(TrueAndFalseFact);
  }
  if (giveTheNameQuestions.length !== 0) {
    arr.push(GiveTheName);
  }
  if (addWordQuestions.length !== 0) {
    arr.push(AddWord);
  }
  if (programmersNamesQuestions.length !== 0) {
    arr.push(ProgrammersRightName);
  }
  if (orderQuestions.length !== 0) {
    arr.push(PutInRightOrder);
  }
  if(flagsQuestions.length !== 0) {
    arr.push(Flags);
  }
  if(chooseAllQuestions.length !== 0) {
    arr.push(ChooseAllCorrectOptions);
  }
  return arr;
}

function callSpell(){
  if (spell !== 'super') {
  document.querySelector('.spells').classList.toggle('showSpells');
  document.querySelector(`.${spell}`).blur();
  modal.style.display = 'block';
  new Spells()[spell]();
}
}

export {
  blitzCount, blitzPower, randomNumber, addRandomClass, randomArrayElem, chooseLanguage, selectElement, roundToTwenty, generateRandomObjProperty,
  createPlayer, showIfAnswerCorrect, showIfAnswerWrong, setVoiceGender, createReadableText, unblockSuperAttack, blockSuperAttack, randomTasksArray,
  selectImage, callSpell, tasksForAttack, tasksForShield, tasksForHeal
}
