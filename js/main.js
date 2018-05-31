'use strict';

const APP_ELEMENT = document.querySelector(`.app`);
const TEMPLATE_ELEMENT = document.querySelector(`template`).content;
const GAME_SCREEN_ELEMENTS = [...TEMPLATE_ELEMENT.querySelectorAll(`.main`)];
const startScreenNumber = 0;
const KEY_CODE = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39
};

let currentScreen = startScreenNumber;

const getElementFromTemplate = (template) => {
  const domParser = new DOMParser();
  return domParser.parseFromString(template, `text/html`).body.firstElementChild;
};

const showScreen = (num) => {
  const MAIN_ELEMENT = APP_ELEMENT.querySelector(`section.main`);
  APP_ELEMENT.replaceChild(GAME_SCREEN_ELEMENTS[num], MAIN_ELEMENT);
};

const showNextScreen = () => {
  currentScreen = currentScreen + 1 === GAME_SCREEN_ELEMENTS.length ? 0 : currentScreen + 1;
  showScreen(currentScreen);
};

const showPreviousScreen = () => {
  currentScreen = currentScreen - 1 < 0 ? GAME_SCREEN_ELEMENTS.length - 1 : currentScreen - 1;
  showScreen(currentScreen);
};

const onArrowPress = (evt) => {
  switch (evt.keyCode) {
    case KEY_CODE.ARROW_LEFT:
      showPreviousScreen();
      break;
    case KEY_CODE.ARROW_RIGHT:
      showNextScreen();
      break;
  }
};

const addNavigationArrows = () => {
  const arrowsMarkup = `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 135px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
  </div>`;
  const arrowsElement = getElementFromTemplate(arrowsMarkup);
  const [leftArrowElement, rightArrowElement] = [...arrowsElement.querySelectorAll(`.arrows__btn`)];

  const onArrowClick = (evt) => {
    switch (evt.target) {
      case leftArrowElement:
        showPreviousScreen();
        break;
      case rightArrowElement:
        showNextScreen();
        break;
    }
  };

  APP_ELEMENT.appendChild(arrowsElement);
  arrowsElement.addEventListener(`click`, onArrowClick);
};

showScreen(startScreenNumber);
document.addEventListener(`keydown`, onArrowPress);
addNavigationArrows();
