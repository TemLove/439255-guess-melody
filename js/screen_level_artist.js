import {getElementFromTemplate, showScreen} from "./util";
import welcomeScreenElement from "./screen_welcome";
import getlevelGenreScreen from "./screen_level_genre";
import getResultScreen from "./screen_result";
import levelHeader from "./level-header";
import {saveAnswer, changeLevel} from "./data/game-data";

const getTemplate = (data) => {
  const levelData = data.levelsData[data.currentScreen];
  const answers = levelData.answers.map((track, index) => {
    return `<div class="main-answer-wrapper" \
    ${data.isTestingMode && track.isAnswerRight ? `style="outline: 2px solid red;"` : ``}>
    <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
    <label class="main-answer" for="answer-${index}">
      <img class="main-answer-preview" src="${track.image}"
           alt="${track.artist}" width="134" height="134">
      ${track.artist}
    </label>
  </div>`;
  }).join();

  const content = `<div class="main-wrap">
  <h2 class="title main-title">Кто исполняет эту песню?</h2>
  <div class="player-wrapper">
    <div class="player">
      <audio src="${levelData.target}"></audio>
      <button class="player-control player-control--pause"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>
  <form class="main-list">
    ${answers}
  </form>
</div>`;

  return `<section class="main main--level main--level-artist">
${levelHeader(data)}
${content}
</section>`;
};

const onPlayAgainClick = () => {
  showScreen(welcomeScreenElement);
};

const getlevelArtistScreen = (data) => {
  const levelArtistElement = getElementFromTemplate(getTemplate(data));
  const playAgainElement = levelArtistElement.querySelector(`.play-again`);
  const answerElements = [...levelArtistElement.querySelectorAll(`.main-answer-wrapper`)];

  const onAnswerClick = (evt) => {
    const answer = getUserAnswer(evt.target);
    const gameData = saveAnswer(data, answer);

    const nextLevel = gameData.currentScreen + 1;

    if (gameData.attemptsLeft === 0 || !gameData.levelsData[nextLevel]) {
      showScreen(getResultScreen(gameData));
    } else {
      if (gameData.levelsData[nextLevel].type === `artist`) {
        showScreen(getlevelArtistScreen(changeLevel(gameData, nextLevel)));
      }
      if (gameData.levelsData[nextLevel].type === `genre`) {
        showScreen(getlevelGenreScreen(changeLevel(gameData, nextLevel)));
      }
    }

    playAgainElement.removeEventListener(`click`, onPlayAgainClick);
    answerElements.forEach((it) => it.removeEventListener(`click`, onAnswerClick));
  };

  const getUserAnswer = (answerElement) => {
    while (!answerElement.classList.contains(`main-answer-wrapper`)) {
      answerElement = answerElement.parentElement;
    }
    const index = answerElements.indexOf(answerElement);
    const isAnswerRight = data.levelsData[data.currentScreen].answers[index].isAnswerRight;
    const spendedTime = 30;

    return {
      isAnswerRight,
      spendedTime
    };
  };

  playAgainElement.addEventListener(`click`, onPlayAgainClick);
  answerElements.forEach((it) => it.addEventListener(`click`, onAnswerClick));

  return levelArtistElement;
};

export default getlevelArtistScreen;
