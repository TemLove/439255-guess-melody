export const getElementFromTemplate = (template) => {
  const domParser = new DOMParser();
  return domParser.parseFromString(template, `text/html`).body.firstElementChild;
};

export const showScreen = (screenElement) => {
  const APP_ELEMENT = document.querySelector(`.app`);
  const MAIN_ELEMENT = APP_ELEMENT.querySelector(`section.main`);
  APP_ELEMENT.replaceChild(screenElement, MAIN_ELEMENT);
};

export const splitTimeValues = (time) => {
  const second = time % 60;
  const minute = Math.trunc(time / 60);
  return {minute, second};
};

export const getWordEnding = (num, endings) => {
  if ((num > 10 && num <= 20) || num % 10 > 4 || num % 10 === 0) {
    return endings[0];
  }

  if (num % 10 === 1) {
    return endings[1];
  }

  return endings[2];
};

export const getRandomIndex = (arr) => {
  return Math.trunc(Math.random() * arr.length);
};

export const randomizeArray = (source, length = source.length) => {
  const arr = source.slice();
  const result = [];
  while (length-- > 0) {
    const randomElementArray = arr.splice(getRandomIndex(arr), 1);
    result.push(randomElementArray[0]);
  }
  return result;
};

export const getRadius = (ratio, radius) => {
  const stroke = Math.round(2 * Math.PI * radius);
  const offset = stroke - Math.round(stroke * ratio);
  return {
    stroke,
    offset
  };
};
