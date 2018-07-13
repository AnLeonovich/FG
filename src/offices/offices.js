import { gameColor } from "../../src/components/modalNav/navigation";

let main = document.querySelector('main'),
    gameBackground;

class Office {
    constructor(background, doors) {
        this.background = background;
        this.doors = doors;
    };
    createOffice(html, level, levelLanguage) {
        let addGameBody = () => {
            gameBackground = $('.game-background');
            gameBackground.addClass(this.background);
            gameBackground.css('background-image', `url("src/officeBackground/${gameColor}-offices/${this.background}.png")`);
        }
        if (this.doors === 2) {
            main.innerHTML = html;
            addGameBody();
        } else if (this.doors === "right") {
            main.classList.add('wrapper__reception');
            main.innerHTML = html;
            addGameBody();
        } else {
            main.classList.add('wrapper__reception');
            main.innerHTML = html;
            addGameBody();
        }
    };
}

export { Office, gameBackground };