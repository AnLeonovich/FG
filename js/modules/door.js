import { SYNTH as synth } from '../consts/const';

export class Door {
  constructor(door) {
    this.door = door;
  }
  openDoor() {
    this.door.click(
      function openDoor() {
        $(this).addClass("doorOpened");
        synth.cancel();
      }
    );
  }
}
