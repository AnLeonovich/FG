import { Loader } from '../../components/loader/loader'
import { createPlayer } from '../../helpers/helpers'
import { offices } from "../../variables/arrays"
import { Office } from '../../offices/offices'
import { SideNav } from '../../components/modalNav/navigation'
import { Dialogs, DialogActions } from '../../components/modalDialog/dialogs'
import { KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN, SYNTH as synth } from '../../consts/const';
import { LevelPage } from '../level/level'

const RECEPTION_BACKGROUND = offices[0];
const RECEPTION_HTML = require('./reception.html');

let player;

export class ReceptionPage {
  constructor() {
    $('.loading').remove();
    new Loader();
    player = createPlayer();
    document.querySelector('body').style.overflow = 'hidden';
    let selectedOffice = RECEPTION_BACKGROUND;
    new Office(RECEPTION_BACKGROUND, "right").createOffice(RECEPTION_HTML);
    new SideNav(selectedOffice).createSideNav();
    $(".hero-container").addClass(player.character).addClass("hero-container-mirror");
    offices.splice(0, 1);

    let door = document.querySelector('.door-right');
    this.elementsEventsMouse(door);
    this.elementsEventsKeyboard(door); 

    let dialogText = new Dialogs().instructions();
    setTimeout(function () {    
      new DialogActions().showDialog(dialogText, 'female');
    }, 700);
  }
  elementsEventsMouse(door) {
    door.addEventListener('click', function (e) {
      door.classList.add("doorOpened");

      synth.cancel();
      setTimeout(() => {
        e.preventDefault();
        new LevelPage();
      }, 1500);
    });
  }
  elementsEventsKeyboard(door) {
    let nav = document.getElementById("humbergerBtn");

    door.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.which === KEY_LEFT) {
        document.querySelector('#humbergerBtn').focus();
        door.blur();
      }
      if (e.which === KEY_ENTER) {
        door.classList.add("doorOpened");
        synth.cancel(); 
        door.blur();
        setTimeout(() => {
          e.preventDefault();
          new LevelPage();
        }, 1500);
      }
    });

    nav.focus();
  } 
}

export { player}