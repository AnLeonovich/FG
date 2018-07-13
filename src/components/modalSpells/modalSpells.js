import { KEY_LEFT, KEY_RIGHT } from '../../consts/const';

const SPELLS_HTML = require('./spells.html');

export class ModalSpells {
	constructor() {
		$( ".game-background" ).prepend(SPELLS_HTML);
		this.elementsEvents();
	}
	elementsEvents() {
    let attack = document.querySelector(".attack");
    let shield = document.querySelector(".shield");
    let blitzAttack = document.querySelector(".blitzAttack");
    let superAttack = document.querySelector(".super");
    let heal = document.querySelector(".heal");

    attack.addEventListener("keydown", (e) => {
      if (e.which === KEY_RIGHT) {
        attack.blur();
        shield.focus();
      }
      if (e.which === KEY_LEFT) {
        attack.blur();
        heal.focus();
      }
    });

    shield.addEventListener("keydown", (e) => {
      if (e.which === KEY_RIGHT) {
        shield.blur();
        blitzAttack.focus();
      }
      if (e.which === KEY_LEFT) {
        shield.blur();
        attack.focus();
      }
    });

    blitzAttack.addEventListener("keydown", (e) => {
      if (e.which === KEY_RIGHT) {
        blitzAttack.blur();
        superAttack.focus();
      }
      if (e.which === KEY_LEFT) {
        blitzAttack.blur();
        shield.focus();
      }
    });

    superAttack.addEventListener("keydown", (e) => {
      if (e.which === KEY_RIGHT) {
        superAttack.blur();
        heal.focus();
      }
      if (e.which === KEY_LEFT) {
        superAttack.blur();
        blitzAttack.focus();
      }
    });

    heal.addEventListener("keydown", (e) => {
      if (e.which === KEY_RIGHT) {
        heal.blur();
        attack.focus();
      }
      if (e.which === KEY_LEFT) {
        heal.blur();
        superAttack.focus();
      }
    });
  }
}