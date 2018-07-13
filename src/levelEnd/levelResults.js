import { Dialogs, DialogActions } from '../components/modalDialog/dialogs'
import { randomArrayElem } from '../helpers/helpers'
import { SideNav } from '../components/modalNav/navigation'
import { PLAYER_MAX_HEALTH, KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_UP, SYNTH as synth } from '../consts/const'
import { LevelPage, monster } from '../screens/level/level'
import { FinalPage } from '../screens/final/final'
import { player } from '../screens/reception/reception'

let lose;

export class LevelResults {
  constructor() { }
  win() {
    player.levelPass++;
    player.health = PLAYER_MAX_HEALTH;
    player.shield = 0;
    player.super = 0;

    localStorage.setItem(player.name, player.levelPass);
    document.querySelector('.level__caption').innerHTML = "Congratulations!";

    let monstersPhrases = new Dialogs().monstersPhrasesLevelWin();
    let dialogText = randomArrayElem(monstersPhrases);
    new DialogActions().showDialog([dialogText]);
    new KeyboardEvents().winLevel();
  }
  lose() {
    lose = true;
    localStorage.setItem(player.name, player.levelPass);

    let monstersPhrases = new Dialogs().monstersPhrasesLevelLose();

    let dialogText = randomArrayElem(monstersPhrases);
    new DialogActions().showDialog([dialogText]);
    new KeyboardEvents().loseLevel();

  }
  winGame() {
    document.querySelector('.level__caption').innerHTML = "Congratulations!";
    player.levelPass++;
    localStorage.setItem(player.name, player.levelPass);
    let dialogText = new Dialogs().monstersPhrasesWinFinal();
    new DialogActions().showDialog([dialogText]);

    new KeyboardEvents().endGame();
  }
}

class KeyboardEvents {
  constructor() {}
  winLevel() {
    let nav = document.getElementById("humbergerBtn");
    let rightDoor = document.querySelector('.door-right');
    let leftDoor = document.querySelector('.door-left');

    nav.focus();

    rightDoor.addEventListener('click', function () { 
      rightDoor.classList.add("doorOpened");
      setTimeout(() => {
        e.preventDefault();
        new LevelPage();
      }, 1500);
    });

    rightDoor.addEventListener("keydown", (e) => {
      if (e.which === KEY_LEFT) {
        rightDoor.blur();
        leftDoor.focus();
      }
      if (e.which === KEY_ENTER) {
        rightDoor.blur();
        synth.cancel(); 
        rightDoor.classList.add("doorOpened");
        setTimeout(() => {
        e.preventDefault();
        new LevelPage();
      }, 1500); 
      }
    });

    leftDoor.addEventListener('click', function () { 
      leftDoor.classList.add("doorOpened");
      setTimeout(() => {
        e.preventDefault();
        new LevelPage();
      }, 1500);
    });

    leftDoor.addEventListener("keydown", (e) => {
      if (e.which === KEY_RIGHT) {
        leftDoor.blur();
        rightDoor.focus();
      }
      if (e.which === KEY_UP) {
        leftDoor.blur();
        nav.focus();
      }
      if (e.which === KEY_ENTER) {
        leftDoor.blur();
        synth.cancel(); 
        leftDoor.classList.add("doorOpened");
        setTimeout(() => {
        e.preventDefault();
        new LevelPage();
      }, 1500); 
      }
    });
  }
  loseLevel() {
    let nav = document.getElementById("humbergerBtn");
    nav.focus();
  }
  endGame() {
    let nav = document.getElementById("humbergerBtn");
    let rightDoor = document.querySelector('.door-right');
    let leftDoor = document.querySelector('.door-left');

    nav.focus();

    rightDoor.addEventListener('click', function () { 
      rightDoor.classList.add("doorOpened");
      setTimeout(() => {
        e.preventDefault();
        new FinalPage();
      }, 1500);
    });

    rightDoor.addEventListener("keydown", (e) => {
      if (e.which === KEY_LEFT) {
        rightDoor.blur();
        leftDoor.focus();
      }
      if (e.which === KEY_ENTER) {
        rightDoor.blur();
        synth.cancel(); 
        rightDoor.classList.add("doorOpened");
        setTimeout(() => {
        e.preventDefault();
        new FinalPage();
      }, 1500); 
      }
    });

    leftDoor.addEventListener('click', function () { 
      leftDoor.classList.add("doorOpened");
      setTimeout(() => {
        e.preventDefault();
        new FinalPage();
      }, 1500);
    });

    leftDoor.addEventListener("keydown", (e) => {
      if (e.which === KEY_RIGHT) {
        leftDoor.blur();
        rightDoor.focus();
      }
      if (e.which === KEY_UP) {
        leftDoor.blur();
        nav.focus();
      }
      if (e.which === KEY_ENTER) {
        leftDoor.blur();
        synth.cancel(); 
        leftDoor.classList.add("doorOpened");
        setTimeout(() => {
        e.preventDefault();
        new FinalPage();
      }, 1500); 
      }
    });
  }
}

export { lose }
