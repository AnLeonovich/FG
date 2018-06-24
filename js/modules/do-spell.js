import { ATTACK_POWER, SHIELD_POWER, HEAL_POWER, PLAYER_MAX_HEALTH, SUPER_ATTACK_POWER, SUPER_SCALE_FULL, LAST_LEVEL  } from './../consts/const'
import { randomNumber, blitzPower, unblockSuperAttack, blockSuperAttack } from './helpers'
import { monster, player, level } from './create-page';
import { showSpell } from './show-spell'
import { monsterAttack } from './monster-attack';
import { levelResults } from './level-results'

export class doSpell {
  constructor() { }
  attack(power) {
    let audio = new Audio(`~/../assets/sounds/attack/${randomNumber(9)}.mp4`);
    audio.play();
    let force = ATTACK_POWER;
    new showSpell().attack('monster');
    if (power !== undefined) {
      force = power;
    }
    if (!monster.shield) {
      monster.health -= force;
    }
    if (monster.shield) {
      if (monster.shield < force) {
        monster.health += monster.shield;
        monster.shield = 0;
        monster.health -= force;
      }
      if (monster.shield > force) {
        monster.shield -= force;
      }
    }
    player.super += 20;
    if (player.super > SUPER_SCALE_FULL) {
      player.super = SUPER_SCALE_FULL;
    }
    document.querySelector('.hero-super_scale').style.width = `${player.super}%`;
    if (player.super === SUPER_SCALE_FULL) {
      unblockSuperAttack();
    }
    if (monster.health <= 0) {
      monster.health = 0; 
      document.querySelector('.monster-health-scale').style.width = `${monster.health}%`;
      document.querySelector('.monster-health-scale__number').innerHTML = '';
      document.querySelector('.monster-shield__number').innerHTML = monster.shield;
      if (level < 5) {
        setTimeout(() => {
          new levelResults().win();
        }, 2000);
      }
      if (level === LAST_LEVEL) {
        setTimeout(() => {
          new levelResults().winGame();
        }, 2000);
      }
    };
    if (monster.health > 0) {
      document.querySelector('.monster-health-scale').style.marginLeft = `${100 - monster.health * 100 / (100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale').style.width = `${monster.health * 100 / (100 + 20 * level)}%`;      
      document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
      document.querySelector('.monster-shield__number').innerHTML = monster.shield;
      setTimeout(() => {
        new monsterAttack();
      }, 2000);
    };
  }
  shield() {
    let audio = new Audio(`~/../assets/sounds/shield/${randomNumber(5)}.mp4`);
    audio.play();
    player.shield += SHIELD_POWER;
    document.querySelector('.hero-shield__number').innerHTML = player.shield;
    new showSpell().shield('hero');
    setTimeout(() => {
      new monsterAttack();
    }, 2000);
  }
  heal() {
    let audio = new Audio(`~/../assets/sounds/heal/${randomNumber(7)}.mp4`);
    audio.play();
    if (player.health < PLAYER_MAX_HEALTH) {
      player.health += HEAL_POWER;
      if (player.health > PLAYER_MAX_HEALTH) {
        player.health = PLAYER_MAX_HEALTH;
      }
    }
    new showSpell().heal('hero');
    document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    setTimeout(() => {
      new monsterAttack();
    }, 2000);
  }
  blitzAttack() {
    if (blitzPower !== 0) {
      new doSpell().attack(blitzPower);
    } else {
      setTimeout(() => {
        new monsterAttack();
      }, 2000);
    }
  }
  super() {
    new doSpell().attack(SUPER_ATTACK_POWER);
    blockSuperAttack();
  }
}
