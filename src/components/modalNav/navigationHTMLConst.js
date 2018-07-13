const SIDE_NAV_HTML = `<div class="sidenav">
  <btn class="close-btn" id="closeBtn" tabindex="1">&#10006;</btn>
  <ul class="sidenav-list">
    <li id="officeColors" tabindex="2">Office Colors</li>
    <li id="soundSettings" tabindex="3">Sound</li>
    <li id="bestResults" tabindex="4">Best Results</li>
    <li id="rules" tabindex="5">Rules</li>
  </ul>
</div>`,

  OFFICE_SETTINGS_HTML = `<div class="menu-modal">
  <div class="menu-modal-content-wrapper">
    <div class="menu-modal-content">
      <div class="menu-modal-caption">
        <btn class="close-btn menu-close-btn" id="closeOffices" tabindex="7">&#10006;</btn>
        <h1>Select Office Color</h1>
      </div>
      <div class="menu-modal-section">
        <div class="offices-grid">
          <div class="offices-row-1" id="row1">
            <div class="office-option office-option-1-1 selected" tabindex="0"></div>
            <div class="office-option office-option-1-2" tabindex="1"></div>
            <div class="office-option office-option-1-3" tabindex="2"></div>
            <div class="office-option office-option-1-4" tabindex="3"></div>
          </div>
          <div class="offices-row-2" id="row2">
            <div class="office-option office-option-2-1" tabindex="4"></div>
            <div class="office-option office-option-2-2" tabindex="5"></div>
            <div class="office-option office-option-2-3" tabindex="6"></div>
        </div>
      </div>
      <div class="menu-modal-submit-wrapper">
        <button type="button" class="btn btn-danger menu-btn" id="saveOfficeBtn">Save</button>
      </div>
    </div>
  </div>
</div>`,

  SOUND_SETTINGS_HTML = `<div class="menu-modal">
<div class="menu-modal-content-wrapper">
  <div class="menu-modal-content">
  <div class="menu-modal-caption">
  <btn class="close-btn menu-close-btn" id="closeSound" tabindex="0">&#10006;</btn>
  <h1>Sound Settings</h1>
</div>
    <div class="menu-modal-section">
      <div class="sound-grid">
        <div class="volume-column">
          <div class="sound-wrapper">
            <div class="map-slider">
              <div class="buttons">
                <span class="fa fa-plus" id="volumePlusBtn" tabindex="0"></span>
                <div class="drag-line">
                  <div class="line" id="volumeLine"></div> 
                  <div class="draggable-button" id="volumeBtn"></div>   
                </div>
                <div class="draggable-buton" id="volumeBtn"></div>   
                <span class="fa fa-minus" id="volumeMinusBtn" tabindex="1"></span>
              </div>
            </div>
          </div>
          <h2 class="sound-caption">Select volume level for a game</h2>
        </div>
        <div class="speed-column">
          <div class="sound-wrapper">
            <div class="map-slider">
              <div class="buttons">
                <span class="fa fa-plus" id="speedPlusBtn" tabindex="2"></span>
                <div class="drag-line">
                  <div class="line" id="speedLine"></div> 
                  <div class="draggable-button" id="speedBtn"></div>   
                </div>
                <div class="draggable-buton" id="speedBtn"></div>   
                <span class="fa fa-minus" id="speedMinusBtn" tabindex="4"></span>
              </div>
            </div>
          </div>
          <h2 class="sound-caption">Select speech speed for a game</h2>
        </div>
      </div>
    </div>
    <div class="menu-modal-submit-wrapper">
      <button type="button" class="btn btn-danger menu-btn" id="saveSoundBtn">Save</button>
    </div>
  </div>
</div>
</div>`,

  PLAY_AGAIN_BTN_HTML = `<div class="menu-modal-submit-wrapper">
                          <a href="https://anleonovich.github.io/Final-Game/" class="new-play-link">
                            <button type="button" class="btn btn-danger menu-btn" id="playAgainBtn">Play Again</button>
                          </a>
                        </div>`,

  RULES_HTML = `<div class="menu-modal">
  <div class="menu-modal-content-wrapper">
    <div class="menu-modal-content">
      <div class="menu-modal-caption">
        <btn class="close-btn menu-close-btn" id="closeRules" tabindex="0">&#10006;</btn>
        <h1>Rules</h1>
      </div>
    <div class="menu-modal-section">
      <div class='rules-wrapper'>
        <p>In this game you are a programmer trying to get a job in the 'We Will Hack You Inc.'.</p>
        <p>You need to complete 5 levels to win. In each level you will come across a "monster" who will test your knowledge in some programming language.</p>
        <p>Use spells to inflict damage or to protect and heal yourself.</p>
        <p>After choosing a spell, you will be given a task. The spell will apply only if your answer is correct. Don't forget to read tasks rules carefully.</p>
        <p>You go first. After your turn a monster does his spell (regardless of the correctness of your answer). Monster can heal and protect himself or attack you (but always in 40 points). With each level the monster's health will increase.</p>
        <p>To win the level you must lower the monster's health to zero.</p>
        <p>Use the doors to go to new levels.</p>
        <p>Good luck!</p>
      </div>
    </div>
  </div>
</div>`;


export {
  SIDE_NAV_HTML, OFFICE_SETTINGS_HTML, SOUND_SETTINGS_HTML, PLAY_AGAIN_BTN_HTML, RULES_HTML
};