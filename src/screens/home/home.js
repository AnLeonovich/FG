import { Loader } from '../../components/loader/loader'
import { KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN } from '../../consts/const';
import { selectElement } from '../../helpers/helpers'
import { ReceptionPage } from '../reception/reception'

export class HomePage {
	constructor() {
    new Loader();
    this.elementsEventsMouse();
	}
	elementsEventsMouse() {
		const characters = document.getElementById('characters');
		const startButton = document.getElementById('startGame');
  	let nameField = document.getElementById("name");
  	nameField.focus();

    Array.from(characters.children).forEach(div => {
      div.addEventListener('click', selectElement)
    });
    
    startButton.addEventListener('click', (e) => {
      e.preventDefault(); 
      new ReceptionPage;
    });

    this.elementsEventsKeyboard(characters, startButton, nameField)
  }
  elementsEventsKeyboard(characters, startButton, nameField) {
    nameField.addEventListener("keydown", (e) => {
      if (e.which === KEY_ENTER) {  
      	e.preventDefault();  
        nameField.blur();
        if (document.querySelector(".selected") !== null){
          document.querySelector(".selected").focus();
        } else {
        	document.querySelector(".greeting__profile_character-item-wrapper").focus();
        	document.querySelector(".greeting__profile_character-item-wrapper").classList.add("selected");
      	}
      }
    });

    startButton.addEventListener("keydown", (e) => {
      if (e.which === KEY_UP) {
      	document.querySelector(".selected").focus();
			}
			if (e.which === KEY_ENTER) {
				startButton.blur();
				new ReceptionPage();
			}
    });

		characters.addEventListener("keydown", (e) => {
  		let current = document.querySelector('.selected');
			if (e.which === KEY_RIGHT) {
        if (current === characters.lastElementChild) {
          characters.firstElementChild.focus();
          characters.firstElementChild.classList.add('selected');
        } else {
        	current.nextElementSibling.classList.add('selected');
        	current.nextElementSibling.focus();
        }
      current.classList.remove('selected');
      current.blur();
			}
			if (e.which === KEY_LEFT) {        
        if (current === characters.firstElementChild) {
          characters.lastElementChild.classList.add('selected');
          characters.lastElementChild.focus();
        } else {
        	current.previousElementSibling.classList.add('selected');
        	current.previousElementSibling.focus();
        }
      current.classList.remove('selected');
      current.blur();
			}
			if (e.which === KEY_UP) {
	  		$(".greeting__profile_name").focus();
			}

			if (e.which === KEY_DOWN || e.which === KEY_ENTER) {
	 			$("#startGame").focus();
			}
		});
	}
}