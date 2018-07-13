import { ATTACK_POWER, SHIELD_POWER, HEAL_POWER, PLAYER_MAX_HEALTH } from '../consts/const'
import { monster, level } from '../screens/level/level';
import { player } from '../screens/reception/reception'
import { LevelResults } from '../levelEnd/levelResults'
import { randomNumber } from '../helpers/helpers'
import { ShowSpell } from '../components/modalSpells/showSpell'

export class MonsterAttack {
  constructor() {
    this.spells = ['attack'];
    if (monster.shield === 0) {
      this.spells.push('shield');
    }
    if (monster.health < (100 + 20 * level)) {
      this.spells.push('heal');
    };
    let spell = this.spells[randomNumber(this.spells.length)];
    setTimeout(this[spell], 1000);
  }
  attack() {
    let audio = new Audio(`~/../src/battle/sounds/attack/${randomNumber(9)}.mp4`);
    audio.play();
    new ShowSpell().attack('hero');
    if (!player.shield) {
      player.health -= ATTACK_POWER;
    }
    if (player.shield) {
      if (player.shield < ATTACK_POWER) {
        player.health += player.shield;
        player.shield = 0;
        player.health -= ATTACK_POWER;
      }
      if (player.shield > ATTACK_POWER) {
        player.shield -= ATTACK_POWER;
      }
    }
    if (player.health <= 0) {
      player.health = 0;
      document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
      document.querySelector('.hero-health-scale__number').innerHTML = player.health;
      document.querySelector('.hero-shield__number').innerHTML = player.shield;
      setTimeout(() => {
        new LevelResults().lose();
      }, 2500);
    };
    if (player.health > 0) {
      document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
      document.querySelector('.hero-health-scale__number').innerHTML = player.health;
      document.querySelector('.hero-shield__number').innerHTML = player.shield;
      setTimeout(function () {
        document.querySelector('.spells').classList.toggle('showSpells');
        document.querySelector("#humbergerBtn").focus();
      }, 2500);
    }
  }
  shield() {
    let audio = new Audio(`~/../src/battle/sounds/shield/${randomNumber(5)}.mp4`);
    audio.play();
    monster.shield += SHIELD_POWER;
    document.querySelector('.monster-shield__number').innerHTML = monster.shield;
    new ShowSpell().shield('monster');
    setTimeout(function () {
      document.querySelector('.spells').classList.toggle('showSpells');
      document.querySelector("#humbergerBtn").focus();
    }, 2500);
  }
  heal() {
    let audio = new Audio(`~/../src/battle/sounds/heal/${randomNumber(7)}.mp4`);
    audio.play();
    monster.health += HEAL_POWER;
    if (monster.health > (100 + 20 * level)) {
      monster.health = 100 + 20 * level;
    };
    document.querySelector('.monster-health-scale').style.width = `${monster.health * 100 / (100 + 20 * level)}%`;
    document.querySelector('.monster-health-scale').style.marginLeft = `${100 - monster.health * 100 / (100 + 20 * level)}%`;
    document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
    new ShowSpell().heal('monster');
    setTimeout(function () {
      document.querySelector('.spells').classList.toggle('showSpells');
      document.querySelector("#humbergerBtn").focus();
    }, 2500);
  }
}
