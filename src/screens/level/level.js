import { Loader } from '../../components/loader/loader'
import { languages, offices, soundLevels } from "../../variables/arrays" 
import { player } from '../reception/reception'
import { randomArrayElem, chooseLanguage, callSpell } from '../../helpers/helpers'
import { Office } from '../../offices/offices'
import { SideNav } from '../../components/modalNav/navigation'
import { MonsterGenerator, Monster } from '../../monster/monsterGenerator'
import { MONSTER_HEAD_ARRAY, MONSTER_BODY_ARRAY, MONSTER_LEGS_ARRAY } from '../../monster/monsterConsts'
import { Dialogs, DialogActions } from '../../components/modalDialog/dialogs'
import { KEY_ENTER } from '../../consts/const';
import { ModalSpells } from '../../components/ModalSpells/ModalSpells'

const LEVEL_HTML = require('./level.html');

let level = 0;
let levelLanguage, monster, monstersPhrases, spell, modal;

export class LevelPage {
	constructor() {
    $('.loading').remove();
		new Loader();
    level++;
    levelLanguage = chooseLanguage(languages);
    let selectedOffice = randomArrayElem(offices);
    new Office(selectedOffice, 2).createOffice(LEVEL_HTML, level, levelLanguage); 
    new SideNav(selectedOffice).createSideNav(level, levelLanguage);
    $("nav").append(`<h1 class='level__caption'>Level ${level} - ${levelLanguage}</h1>`);

    $(".hero-container").addClass(player.character);
    new MonsterGenerator($(".monster-head-container"), $(".monster-body-container"), $(".monster-legs-container"), ).generateMonster(MONSTER_HEAD_ARRAY, MONSTER_BODY_ARRAY, MONSTER_LEGS_ARRAY );
    monster = new Monster(level);

    this.showStartScales();
    new ModalSpells();

    if (level === 5) {
      monstersPhrases = new Dialogs().monstersPhrasesFinal();
    } else {
    	monstersPhrases = new Dialogs().monstersPhrasesLevelStart();
    }

    setTimeout(function () {
      let dialogText = randomArrayElem(monstersPhrases);
      new DialogActions().showDialog([dialogText]);
    }, 1000);

    this.elementsEvents();
	}
	showStartScales() {
		document.querySelector('.monster-health__wrapper').style.width = `${200 + 20 * level}px`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
    document.querySelector('.hero-shield__number').innerHTML = player.shield;
    document.querySelector('.monster-shield__number').innerHTML = monster.shield;
	}
	elementsEvents() {
		let nav = document.getElementById("humbergerBtn");
		nav.focus();

		dialogButton.addEventListener("keydown", this.startLevelDialog);

    let magic = document.querySelector('.spells');
    Array.from(magic.children).forEach(div => {
      div.addEventListener('click', e => {
        spell = e.target.classList[1];
        modal = document.getElementById('taskModal');
        callSpell();
      });
      div.addEventListener("keydown", (e) => {
        if (e.which === KEY_ENTER) {
          spell = e.target.classList[1];
          modal = document.getElementById('taskModal');
          callSpell();
        }
      });
    });
  }
}

export { level, levelLanguage, monster, spell, modal }