import { randomNumber, addRandomClass } from '../helpers/helpers'
import { ROLE_ARRAY, NAME_ARRAY , SECOND_NAME_ARRAY } from './monsterConsts'

export class Monster { 
  constructor(level) {
    this.health = 100 + 20 * level;
    this.shield = 0;
  }
}

export class MonsterGenerator {
  constructor(head, body, legs) {
    this.head = head;
    this.body = body;
    this.legs = legs;
  };
  generateMonster(headArray, bodyArray, legsArray) {
    addRandomClass(this.head, headArray);
    addRandomClass(this.body, bodyArray);
    addRandomClass(this.legs, legsArray);
    new NameGenerator(ROLE_ARRAY, NAME_ARRAY, SECOND_NAME_ARRAY).showMonsterName();
  }
}

class NameGenerator {
  constructor(nameOptionsArray1, nameOptionsArray2, nameOptionsArray3) {
    this.position = nameOptionsArray1;
    this.name = nameOptionsArray2;
    this.surname = nameOptionsArray3;
  };
  generateRandomName() {
    return this.position[randomNumber(this.position.length)] + ' ' +
      this.name[randomNumber(this.name.length)] + ' ' +
      this.surname[randomNumber(this.surname.length)];
  };
  showMonsterName() {
    let monsterRandomName = this.generateRandomName();
    $(".monster-name").append(monsterRandomName);
  }
}
