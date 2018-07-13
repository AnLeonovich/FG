import { ATTACK_POWER, SHIELD_POWER, HEAL_POWER, PLAYER_MAX_HEALTH, SUPER_ATTACK_POWER, SUPER_SCALE_FULL, LAST_LEVEL  } from '../consts/const'
import { randomNumber, blitzPower, unblockSuperAttack, blockSuperAttack } from '../helpers/helpers'
import { monster, level } from '../screens/level/level';
import { player } from '../screens/reception/reception'
import { ShowSpell } from '../components/modalSpells/showSpell'
import { MonsterAttack } from './monsterAttack';
import { LevelResults } from '../levelEnd/levelResults'

export class PlayerAttack {
  constructor() { }
  attack(power) {
    let audio = new Audio(`~/../src/battle/sounds/attack/${randomNumber(9)}.mp4`);
    audio.play();
    let force = ATTACK_POWER;
    new ShowSpell().attack('monster');
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
      if (level < LAST_LEVEL) {
        setTimeout(() => {
          new LevelResults().win();
        }, 2000);
      }
      if (level === LAST_LEVEL) {
        setTimeout(() => {
          new LevelResults().winGame();
        }, 2000);
      }
    };
    if (monster.health > 0) {
      document.querySelector('.monster-health-scale').style.marginLeft = `${100 - monster.health * 100 / (100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale').style.width = `${monster.health * 100 / (100 + 20 * level)}%`;      
      document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
      document.querySelector('.monster-shield__number').innerHTML = monster.shield;
      setTimeout(() => {
        new MonsterAttack();
      }, 2000);
    };
  }
  shield() {
    let audio = new Audio(`~/../src/battle/sounds/shield/${randomNumber(5)}.mp4`);
    audio.play();
    player.shield += SHIELD_POWER;
    document.querySelector('.hero-shield__number').innerHTML = player.shield;
    new ShowSpell().shield('hero');
    setTimeout(() => {
      new MonsterAttack();
    }, 2000);
  }
  heal() {
    let audio = new Audio(`~/../src/battle/sounds/heal/${randomNumber(7)}.mp4`);
    audio.play();
    if (player.health < PLAYER_MAX_HEALTH) {
      player.health += HEAL_POWER;
      if (player.health > PLAYER_MAX_HEALTH) {
        player.health = PLAYER_MAX_HEALTH;
      }
    }
    new ShowSpell().heal('hero');
    document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    setTimeout(() => {
      new MonsterAttack();
    }, 2000);
  }
  blitzAttack() {
    if (blitzPower !== 0) {
      this.attack(blitzPower);
    } else {
        new MonsterAttack();
    }
  }
  super() {
    this.attack(SUPER_ATTACK_POWER);
    blockSuperAttack();
  }
}
