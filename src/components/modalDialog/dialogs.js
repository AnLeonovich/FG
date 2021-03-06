import { level, levelLanguage, monster } from '../../screens/level/level'
import { player } from '../../screens/reception/reception'
import { setVoiceGender, createReadableText } from '../../helpers/helpers'
import { SideNav } from '../modalNav/navigation'
import { lose } from '../../levelEnd/levelResults'
import { boss } from '../../screens/final/final'
import { KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN, SYNTH as synth } from '../../consts/const';

const DIALOGS_HTML = require('./dialogs.html');

export class Dialogs {
  constructor() {
    if (document.querySelector('.dialog') === null) {
      $("main").append(DIALOGS_HTML);
      new DialogActions().elementsEventsKeyboard();
    }
  }
  instructions() {
    let arr = [`Hello, ${player.name}! Welcome to 'We Will Hack You Inc.' - one of the best companies in the world. To learn more, look to the rules in your menu. When you are ready - go through that door. Good luck!`];
    return arr;
  }
  monstersPhrasesLevelStart() {
    let arr = [
      `Well ${player.name}, let's check your ${levelLanguage} skills.`,
      `Heard you are a big fan of ${levelLanguage}. Will see!`,
      `Glad to see you, ${player.name}! Let's do ${levelLanguage}.`,
      `You think my level is easy? ${levelLanguage} is not a language, it's a life style!`,
      `Let's see what you got, ${player.name}!`,
      `Let's see how you cope with ${levelLanguage} level, ${player.name}!`,
      `I can't wait to start, ${player.name}!`,
      `Don't be afraid, ${player.name}, ${levelLanguage} - it's easy. Let's start!`,
      `You shall not pass, ${player.name}!!!`,
      `Only one candidate have passed this level. Are you ready, ${player.name}?`
    ];
    return arr;
  }
  monstersPhrasesLevelWin() {
    let arr = [
      `Excellent work, ${player.name}! Choose your way and good luck.`,
      `You're really good in ${levelLanguage}. You can go through any door for the next interview.`,
      `I'm impressed, ${player.name}! Good luck on the next interview, choose any door.`,
      `Your knowledge of ${levelLanguage} is very good! You can go to any door for next level.`,
      `Good interview, I wish good luck to the next. Choose any door, ${player.name}`,
      `Amazing skills, ${player.name}! Go through one of this doors to continue.`,
      `You really are good at ${levelLanguage}. Choose the door and good luck.`,
      `Good job, ${player.name}. You can go to any door for next level.`,
      `I see, ${levelLanguage} is to easy for you, isn't it? Go through one of this doors to continue.`,
      `I see, you're really big fan of ${levelLanguage}! Good luck on the next interview, ${player.name}, choose any door.`
    ];
    return arr;
  }
  monstersPhrasesLevelLose() {
    let arr = [
      `Better luck next time, ${player.name}.`,
      `I'm sorry, ${player.name}, but as long as your knowledge is not enough.`,
      `You need to pay more attention to ${levelLanguage}. Come again when you are ready.`,
      `You should seriously study ${levelLanguage}. Your knowledge is not enough yet.`,
      `I think in half a year you will succeed. Good luck, ${player.name}!`,
      `Your skills are not enough yet. Good buy, ${player.name}.`,
      `Not bad, ${player.name}, but you still need to learn  a lot. See you!`,
      `We will call you, ${player.name}`,
      `Sorry, ${player.name}, but we can't offer you job now.`,
      `You have serious problems with ${levelLanguage}. Keep learning, ${player.name}`
    ];
    return arr;
  }
  monstersPhrasesFinal() {
    let arr = [
      `Great work, ${player.name}! It is the last test, let's begin!`,
      `Was it easy to get here? Well, the last fight!`,
      `Don't be too happy, ${player.name}! Here everything can end!`
    ];
    return arr;
  }
  monstersPhrasesWinFinal() {
    let arr = [`Congratulations, ${player.name}, your level is really great. I'll be glad to see you sometime and talk a bit more about ${levelLanguage}. Go through any door, your Boss is waiting.`];
    return arr;
  }
  boss() {
    let arr = [`Hello, ${player.name}! My "monsters" have tested you well, right? But now we know for sure that you are worthy to become a part of our company! Welcome and good luck in your future work!`];
    return arr;
  }
}

export class DialogActions {
  constructor() {
    
  }
  showDialog(text, gender) {
    let dialogWrapper = document.getElementById('dialog');
    dialogWrapper.classList.toggle('dialog-active');
    let dialogButton = document.getElementById('dialogButton');
    dialogButton.addEventListener('click', this.closeDialog);
    this.writeDialogText('message', text, 60, gender);
  }
  writeDialogText(id, text, speed, gender) {
    document.getElementById('message').innerHTML = '';
    let ele = document.getElementById(id),
      txt = text.join("").split("");
    let readDialogText = createReadableText(text);
    setVoiceGender(readDialogText, gender);

    synth.speak(readDialogText);
    let interval = setInterval(function () {
      if (!txt[0]) {
        return clearInterval(interval);
      };
      ele.innerHTML += txt.shift();
    }, speed != undefined ? speed : 100);
    return false;
  }
  closeDialog() {
    synth.cancel();
    let dialogWrapper = document.getElementById('dialog');
    dialogWrapper.classList.toggle('dialog-active');
    if ( monster !== undefined ) {
      if (level && player.health !== 0 && monster.health !== 0) {
        document.querySelector('.spells').classList.toggle('showSpells');
      }
    }
    if (boss === true || lose === true) {
      new SideNav().showResults(true);
    }
  }
  elementsEventsKeyboard() {
    let dialogButton = document.getElementById('dialogButton');
    dialogButton.addEventListener("keydown", (e) => {
      if (e.which === KEY_ENTER) {
        this.closeDialog();
        if (document.querySelector('.showSpells') !== null) {
          document.getElementById("humbergerBtn").focus();
        } else if (boss === true || lose === true){
          dialogButton.blur();
          document.querySelector("#closeResults").focus();
          document.querySelector("#closeResults").addEventListener("keydown", (e) => {
          if (e.which === KEY_DOWN) {
            document.querySelector("#closeResults").blur();
            document.querySelector("#playAgainBtn").focus();
          }
        });
        document.querySelector("#playAgainBtn").addEventListener("keydown", (e) => {
          if (e.which === KEY_UP) {
            document.querySelector("#playAgainBtn").blur();
            document.querySelector("#closeResults").focus();
          }
      });

        } else {
          document.querySelector('.door-right').focus();
        }
        dialogButton.blur();
      }
      if (e.which === KEY_RIGHT) {
        document.querySelector('.door-right-reception').focus();
        dialogButton.blur();            
      }
      if (e.which === KEY_UP || e.which === KEY_LEFT) {
        dialogButton.blur();
        document.querySelector('#humbergerBtn').focus();
      }
    });
  } 
}