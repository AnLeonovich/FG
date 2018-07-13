import { modal, levelLanguage } from '../../screens/level/level'
import { randomArrayElem, randomTasksArray, tasksForAttack, tasksForShield, tasksForHeal } from '../../helpers/helpers'

let BC = false;

export class Spells { 
  constructor() {
    if (BC === 1) { BC = false; }
  } 
  attack() {
    let task = tasksForAttack(levelLanguage);
    new task();
  }
  shield() {
    let task = tasksForShield(levelLanguage);
    new task();
  }
  heal() {
    let task = tasksForHeal(levelLanguage);
    new task();
  }
  blitzAttack() {
    modal.style.display = 'block';
    let tasks = randomTasksArray();
    let task = randomArrayElem(tasks);
    let { blitzCount } = require('../../helpers/helpers');
    BC = blitzCount;
    if (!BC) {
      BC = 3;
    };
    new task();
  }
  superAttack() {
    modal.style.display = 'block';
    let tasks = randomTasksArray();
    let task = randomArrayElem(tasks);
    new task();
  }
}

export { BC }