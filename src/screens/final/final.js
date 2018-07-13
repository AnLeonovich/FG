import { Loader } from '../../components/loader/loader'
import { level } from '../level/level'
import { player } from '../reception/reception'
import { Office } from '../../offices/offices'
import { SideNav } from '../../components/modalNav/navigation'
import { Dialogs, DialogActions } from '../../components/modalDialog/dialogs'

const FINAL_PAGE_HTML = require('./final.html');

let boss;

export class FinalPage {
  constructor() {
    $('.loading').remove();
    new Loader();
    boss = true;
    let selectedOffice = "office-6";
    new Office(selectedOffice, "left").createOffice(FINAL_PAGE_HTML);
    $(".hero-container").addClass(player.character);
    new SideNav(selectedOffice).createSideNav();
    this.elementsEvents();
    let dialogText = new Dialogs().boss();
    setTimeout(function () {
      new DialogActions().showDialog([dialogText]);
    }, 500);
  }
  elementsEvents() {
    let nav = document.getElementById("humbergerBtn");
    nav.focus();
  }
}

export { boss }