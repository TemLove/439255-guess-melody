export const getElementFromTemplate = (template) => {
  const domParser = new DOMParser();
  return domParser.parseFromString(template, `text/html`).body.firstElementChild;
};

const APP_ELEMENT = document.querySelector(`.app`);
export const showScreen = (screenElement) => {
  const MAIN_ELEMENT = APP_ELEMENT.querySelector(`section.main`);
  APP_ELEMENT.replaceChild(screenElement, MAIN_ELEMENT);
};
