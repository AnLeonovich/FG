import { CLIP_PXS, MOVE_LENGTH, SOUND_LEVELS } from "./navigationConst";
import { OFFICE_COLORS, KEY_ENTER, KEY_UP, KEY_DOWN, KEY_RIGHT, KEY_LEFT } from "../../consts/const";
import { SIDE_NAV_HTML, OFFICE_SETTINGS_HTML, SOUND_SETTINGS_HTML, PLAY_AGAIN_BTN_HTML, RULES_HTML } from "./navigationHTMLConst";
import { ResultsTable } from "../modalResultTable/resultTable";
import { selectElement, roundToTwenty } from "../../helpers/helpers";
import { gameBackground } from '../../offices/offices';

const NAV_HTML = require('./navigation.html');

let gameColor = OFFICE_COLORS[3],
    volume = 1,
    rate = 1,
    lineHeight,
    soundLevel = volume;

class SoundSlider {
    constructor(soundLine, soundBtn, minusBtn, plusBtn) {
        this.soundLine = soundLine;
        this.soundBtn = soundBtn;
        this.minusBtn = minusBtn;
        this.plusBtn = plusBtn;
        this.soundLevel;
    };
    createSoundSlider(soundLevel) {
        lineHeight = ($(this.soundLine).height());
        let sliderSoundLine = this.soundLine,
            sliderSoundBtn = this.soundBtn,
            sliderMinusBtn = this.minusBtn,
            sliderPlusBtn = this.plusBtn;

        let findSliderPosition = (soundLevel) => {
            for (let i in SOUND_LEVELS) {
                let soundObj = SOUND_LEVELS[i],
                    sliderPosition = _.keys(soundObj)[0],
                    soundLevelNumber = soundObj[sliderPosition];

                if (soundLevel === soundLevelNumber) {
                    return sliderPosition;
                }
            }
        }

        let setSliderToCurrentPosition = () => {
            $(sliderSoundLine).css({
                'clip': 'rect(' + findSliderPosition(soundLevel) + CLIP_PXS
            });
            $(sliderSoundBtn).css({
                'top': findSliderPosition(soundLevel) - (MOVE_LENGTH / 2)
            });
            $(sliderSoundBtn).draggable({
                axis: 'y',
                containment: 'parent'
            });
        }

        let reactToDrag = () => {
            $(sliderSoundBtn).on('drag', () => {
                let soundLevel = $(sliderSoundBtn).position().top;

                $(sliderSoundLine).css({
                    'clip': 'rect(' + soundLevel + CLIP_PXS
                });
            });
        }

        let reactToMinusBtn = () => {
            $(sliderMinusBtn).click(() => { this.reactToMinusBtn(); });
            $(sliderMinusBtn).keydown((e) => { 
                if (e.which === KEY_ENTER) {
                    this.reactToMinusBtn();
                }
            });
        }

        let reactToPlusBtn = () => {
            $(sliderPlusBtn).click(() => { this.reactToPlusBtn(); });
            $(sliderPlusBtn).keydown((e) => { 
                if (e.which === KEY_ENTER) {
                    this.reactToPlusBtn();
                }
            });
        }

        setSliderToCurrentPosition();
        reactToDrag();
        reactToMinusBtn();
        reactToPlusBtn();
    }
    reactToMinusBtn() {
        let sliderSoundLine = this.soundLine,
            sliderSoundBtn = this.soundBtn;
        let soundLevel = $(sliderSoundBtn).position().top + MOVE_LENGTH;
        $(sliderSoundLine).css({
            'clip': 'rect(' + soundLevel + CLIP_PXS
        });

        if (soundLevel <= lineHeight - (MOVE_LENGTH / 2)) {
            $(sliderSoundBtn).css({
                'top': soundLevel
            });
        } else {
            soundLevel = lineHeight - (MOVE_LENGTH / 2);
        }
    }
    reactToPlusBtn() {
        let sliderSoundLine = this.soundLine,
            sliderSoundBtn = this.soundBtn;
        let soundLevel = $(sliderSoundBtn).position().top - MOVE_LENGTH;
        $(sliderSoundLine).css({
            'clip': 'rect(' + soundLevel + CLIP_PXS
        });

        if (soundLevel + MOVE_LENGTH > 0) {
            $(sliderSoundBtn).css({
                'top': soundLevel
            });
        };

        if (soundLevel >= lineHeight - (MOVE_LENGTH / 2)) {
            soundLevel = lineHeight - (MOVE_LENGTH * 2);
        }
    }
    getSoundSetting(sliderSoundBtn) {
        for (let i in SOUND_LEVELS) {
            soundLevel = roundToTwenty($(sliderSoundBtn).position().top, MOVE_LENGTH, 0);
            let soundLevelNumber = Number(_.keys(SOUND_LEVELS[i]));
            if (soundLevel === soundLevelNumber) {
                return SOUND_LEVELS[i][soundLevelNumber];
            }
        }
    }
};

class SideNav {
    constructor(background) {
        this.background = background;
        $(".game-background").append(NAV_HTML);
    };
    createSideNav(level, levelLanguage) {

        let createSideNav = () => {
            $(".game-background").append(SIDE_NAV_HTML);

            $("#humbergerBtn").click(() => {
                $(".background-opacity-wrapper").addClass("background-opacity-wrapper-width");
                $(".sidenav").addClass("sidenav-width");
            });

            $("#closeBtn").click(() => {
                $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
                $(".sidenav").removeClass("sidenav-width");
            });
        }

        let createSideNavMenuItems = () => {
            $('#officeColors').click(() => {
                this.showOfficeSelector();
            });
            $('#officeColors').keydown((e) => {
                if (e.which === KEY_ENTER) {
                    this.showOfficeSelector();
                    e.target.blur();
                    $('.office-option-1-1').focus();
                    this.officesKeyboardEvents();
                }
            });

            $('#soundSettings').click(() => {
                this.showSoundSelector();
            });
            $('#soundSettings').keydown((e) => {
                if (e.which === KEY_ENTER) {
                    this.showSoundSelector();
                    e.target.blur();
                    $('#volumePlusBtn').focus();
                    this.volumeKeyboardEvents();
                }
            });

            $("#bestResults").click(() => {
                this.showResults();
            });
            $('#bestResults').keydown((e) => {
                if (e.which === KEY_ENTER) {
                    this.showResults();
                    e.target.blur();
                    $('#closeResults').focus();                    
                }
            });

            $('#rules').click(() => {
                this.showRules();
            });
            $('#rules').keydown((e) => {
                if (e.which === KEY_ENTER) {
                    this.showRules();
                    e.target.blur();
                    $('#closeRules').focus();
                }
            })
        }

        createSideNav();
        createSideNavMenuItems();
        this.elementsEventsKeyboard();
    }
    showOfficeSelector() {
        let createOfficeSettingsModal = () => {
            $(".game-background").append(OFFICE_SETTINGS_HTML);
            let officesArray = $(".office-option").toArray();
            for (let i in officesArray) {
                $(officesArray[i]).css('background-image', `url("src/officeBackground/${OFFICE_COLORS[i]}-offices/${this.background}.png")`);
                $(officesArray[i]).click(selectElement);
            }
            this.closeMenuModal("#closeOffices");
        }

        let applySelectedOffice = () => {
            $("#saveOfficeBtn").click(() => { this.saveOffice(); });
            $("#saveOfficeBtn").keydown((e) => { 
                if (e.which === KEY_ENTER) {
                    this.saveOffice(); 
                }
                if (e.which === KEY_UP) {
                    $(".selected").focus();  
                }
            });
        }

        createOfficeSettingsModal();
        applySelectedOffice();
    }
    showSoundSelector() {
        let volumeSlider = new SoundSlider("#volumeLine", "#volumeBtn", "#volumeMinusBtn", "#volumePlusBtn");
        let speedSlider = new SoundSlider("#speedLine", "#speedBtn", "#speedMinusBtn", "#speedPlusBtn");

        let createSoundSelectorModule = () => {
            $(".game-background").append(SOUND_SETTINGS_HTML);

            volumeSlider.createSoundSlider(volume);
            speedSlider.createSoundSlider(rate);

            this.closeMenuModal("#closeSound");
        };

        let applySoundSettings = () => {
            $("#saveSoundBtn").click(() => {
                volume = volumeSlider.getSoundSetting("#volumeBtn");
                rate = speedSlider.getSoundSetting("#speedBtn");
                $(".menu-modal").remove();
                $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
                $(".sidenav").removeClass("sidenav-width");
                $("#saveSoundBtn").blur();
                $("#humbergerBtn").focus(); 
            });
        };

        createSoundSelectorModule();
        applySoundSettings();

    }
    showRules() {
        $(".game-background").append(RULES_HTML);
        this.closeMenuModal("#closeRules");
    }
    showResults(btn) {
        new ResultsTable().showResults();
        this.closeMenuModal("#closeResults");
        if (btn) {
            this.addPlayAgainBtn();
        }
    }

    saveOffice() {
        let selectedBgd = $(".selected").css("background-image");
        gameColor = selectedBgd.match("(?<=Background\/)(.*)(?=-offices)")[0];
        gameBackground.css("background-image", selectedBgd);
        $(".menu-modal").remove();
        $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
        $(".sidenav").removeClass("sidenav-width");
        $("#saveOfficeBtn").blur();
        $("#humbergerBtn").focus();        
    }
    closeMenuModal(closeBtn) {
        $(closeBtn).click(() => {
            $(".menu-modal").remove();
            $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
        })

        $(closeBtn).keydown((e) => {
            if (e.which === KEY_ENTER) {
                $(".menu-modal").remove();
                $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
                e.target.blur();
                $('#officeColors').focus();
        }
        })
    }
    addPlayAgainBtn() {
        $(".menu-modal-content").append(PLAY_AGAIN_BTN_HTML);
    }
    officesKeyboardEvents() {
        let officeColors = document.getElementById('officeColors');
        let officeColorsFirstRow = document.getElementById('row1');
        let officeColorsSecondRow = document.getElementById('row2');
        let closeButton = document.getElementById("closeOffices");

        closeButton.addEventListener("keydown", (e) => {
            if (e.which === KEY_DOWN) {
                closeButton.blur();
                document.querySelector('.selected').focus();
            }
        });

        officeColorsFirstRow.addEventListener("keydown", (e) => {
            let current = document.querySelector('.selected');
            if (e.which === KEY_RIGHT) {
                if (current === officeColorsFirstRow.lastElementChild) {
                    officeColorsSecondRow.firstElementChild.focus();
                    current.classList.remove('selected');
                    officeColorsSecondRow.firstElementChild.classList.add('selected');
                  } else {
                    current.nextElementSibling.classList.add('selected');
                    current.classList.remove('selected');
                    current.nextElementSibling.focus();
                }
            }

            if (e.which === KEY_LEFT) {        
                if (current === officeColorsFirstRow.firstElementChild) {
                    officeColorsSecondRow.lastElementChild.classList.add('selected');
                    current.classList.remove('selected');
                    officeColorsSecondRow.lastElementChild.focus();
                } else {
                    current.previousElementSibling.classList.add('selected');
                    current.classList.remove('selected');
                    current.previousElementSibling.focus();
                }
            }

            if (e.which === KEY_DOWN) {
                officeColorsSecondRow.firstElementChild.focus();
                current.classList.remove('selected');         
                officeColorsSecondRow.firstElementChild.classList.add('selected');
            }

            if (e.which === KEY_UP) {
                closeButton.focus();
            }
            
            if (e.which === KEY_ENTER) {
                document.getElementById("saveOfficeBtn").focus();
            }
            current.blur();
        });

        officeColorsSecondRow.addEventListener("keydown", (e) => {
            let current = document.querySelector('.selected');
            if (e.which === KEY_RIGHT) {
                if (current === officeColorsSecondRow.lastElementChild) {
                    officeColorsFirstRow.firstElementChild.focus();
                    current.classList.remove('selected');
                    officeColorsFirstRow.firstElementChild.classList.add('selected');
                } else {
                    current.nextElementSibling.classList.add('selected');
                    current.classList.remove('selected');
                    current.nextElementSibling.focus();
                }
            }

            if (e.which === KEY_LEFT) {        
                if (current === officeColorsSecondRow.firstElementChild) {
                    officeColorsFirstRow.lastElementChild.classList.add('selected');
                    current.classList.remove('selected');
                    officeColorsFirstRow.lastElementChild.focus();
                } else {
                    current.previousElementSibling.classList.add('selected');
                    current.classList.remove('selected');
                    current.previousElementSibling.focus();
                }
            }

            if (e.which === KEY_UP) {
                officeColorsFirstRow.firstElementChild.focus();
                current.classList.remove('selected');
                officeColorsFirstRow.firstElementChild.classList.add('selected');
            }

            if (e.which === KEY_DOWN) {
                document.getElementById("saveOfficeBtn").focus();            
            }

            if (e.which === KEY_ENTER) {
                document.getElementById("saveOfficeBtn").focus();
            }          
            current.blur();
        });
    }
    volumeKeyboardEvents() {
        let volumePlusBtn = document.getElementById('volumePlusBtn');
        let volumeMinusBtn = document.getElementById('volumeMinusBtn');
        let speedPlusBtn = document.getElementById('speedPlusBtn');
        let speedMinusBtn = document.getElementById('speedMinusBtn');
        let closeSound = document.getElementById('closeSound');
        let saveSoundBtn = document.getElementById('saveSoundBtn');

        saveSoundBtn.addEventListener("keydown", (e) => {
            if (e.which === KEY_UP) {
                volumeMinusBtn.focus();
                saveSoundBtn.blur();            
            }
        });

        closeSound.addEventListener("keydown", (e) => {
            if (e.which === KEY_DOWN || e.which === KEY_LEFT) {
                volumeMinusBtn.focus();
                closeSound.blur();            
            }
        });

        volumePlusBtn.addEventListener("keydown", (e) => {
            if (e.which === KEY_RIGHT) {
                speedPlusBtn.focus();
                volumePlusBtn.blur();
            }

            if (e.which === KEY_DOWN) {
                volumeMinusBtn.focus();
                volumePlusBtn.blur();            
            }
            
            if (e.which === KEY_UP) {
                closeSound.focus();
                volumeMinusBtn.blur();            
            }
        });

        volumeMinusBtn.addEventListener("keydown", (e) => {
            if (e.which === KEY_RIGHT) {
                speedMinusBtn.focus();
                volumeMinusBtn.blur();
            }

            if (e.which === KEY_UP) {
                volumePlusBtn.focus();
                volumeMinusBtn.blur();            
            }
            if (e.which === KEY_DOWN) {
                saveSoundBtn.focus();
                volumeMinusBtn.blur();            
            }
        });

        speedPlusBtn.addEventListener("keydown", (e) => {
            if (e.which === KEY_LEFT) {
                volumePlusBtn.focus();
                speedPlusBtn.blur();
            }

            if (e.which === KEY_DOWN) {
                speedMinusBtn.focus();
                speedPlusBtn.blur();            
            }
            if (e.which === KEY_UP || e.which === KEY_RIGHT) {
                closeSound.focus();
                speedPlusBtn.blur();            
            }
        });

        speedMinusBtn.addEventListener("keydown", (e) => {
            if (e.which === KEY_LEFT) {
                volumeMinusBtn.focus();
                speedMinusBtn.blur();
            }
            if (e.which === KEY_UP) {
                speedPlusBtn.focus();
                speedMinusBtn.blur();            
            }
            if (e.which === KEY_RIGHT) {
                closeSound.focus();
                speedMinusBtn.blur();            
            }
            if (e.which === KEY_DOWN) {
                saveSoundBtn.focus();
                speedMinusBtn.blur();            
            }
        });
    }
    elementsEventsKeyboard() {
        let menuItems = document.querySelector(".sidenav-list");
        let closeButton = document.querySelector(".close-btn");
        let nav = document.getElementById("humbergerBtn");

        nav.addEventListener("keydown", (e) => {
            if (e.which === KEY_ENTER){
                $(".background-opacity-wrapper").addClass("background-opacity-wrapper-width");
                $(".sidenav").addClass("sidenav-width");
                nav.blur();
                document.getElementById('officeColors').focus();
            }
            if (e.which === KEY_RIGHT) {
                nav.blur();
                if (document.querySelector('.dialog-active') !== null){
                    document.getElementById('dialogButton').focus();
                } else if (document.querySelector('.showSpells') !== null){
                    document.querySelector('.attack').focus();
                } else {
                    document.querySelector('.door-right').focus();
                }
            }
        });

        menuItems.addEventListener("keydown", (e) => {
            if (e.which === KEY_UP) {
                e.target.blur();
                if(e.target !== menuItems.firstElementChild){
                    e.target.previousElementSibling.focus();
                } else {
                    closeButton.focus();
                }
            }

            if (e.which === KEY_DOWN) {
                e.target.blur();
                if(e.target !== menuItems.lastElementChild){
                    e.target.nextElementSibling.focus();
                } else {
                    closeButton.focus();
                }
            }
        });

        closeButton.addEventListener("keydown", (e) => {
            if (e.which === KEY_UP) {
                e.target.blur();
                menuItems.lastElementChild.focus();
            }

            if (e.which === KEY_DOWN) {
                e.target.blur();
                menuItems.firstElementChild.focus();
            }

            if (e.which === KEY_ENTER) {
                e.target.blur();
                $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
            $(".sidenav").removeClass("sidenav-width");
            nav.focus();
            }
        });
    }
}

export { SideNav, gameColor, volume, rate };