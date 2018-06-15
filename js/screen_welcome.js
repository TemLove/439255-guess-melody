import {getElementFromTemplate, showScreen} from "./util";
import getlevelArtistScreen from "./screen_level_artist";
import {gameOptions, gameState} from "./data/game-data";
import getlevelGenreScreen from "./screen_level_genre";

const SEC_IN_MINUTE = 60;

const getTemplate = (data) => {
  return `<section class="main main--welcome">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;${data.timeAll / SEC_IN_MINUTE} минут ответить на все вопросы.<br>
    Ошибиться можно ${data.attemptsCount} раза.<br>
    Удачи!
  </p>
  </section>`;
};

const template = getTemplate(gameOptions);
const welcomeScreenElement = getElementFromTemplate(template);
const playElement = welcomeScreenElement.querySelector(`.main-play`);

const onButtonClick = () => {
  const startLevel = gameState.levelsData[0];

  if (startLevel.type === `artist`) {
    showScreen(getlevelArtistScreen(gameState));
  }
  if (startLevel.type === `genre`) {
    showScreen(getlevelGenreScreen(gameState));
  }
};

playElement.addEventListener(`click`, onButtonClick);

export default welcomeScreenElement;
