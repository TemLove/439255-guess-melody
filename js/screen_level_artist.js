import {getElementFromTemplate, showScreen} from "./util";
import welcomeScreenElement from "./screen_welcome";
import getlevelGenreScreen from "./screen_level_genre";
import getResultScreen from "./screen_result";
import levelHeader from "./level-header";

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
    saveUserAnswer(evt.target.parentElement.parentElement);

    const nextLevel = data.levelsData[data.currentScreen + 1];

    if (data.attemptsLeft === 0 || !nextLevel) {
      showScreen(getResultScreen(data));
    } else {
      data.currentScreen += 1;
      if (nextLevel.type === `artist`) {
        showScreen(getlevelArtistScreen(data));
      }
      if (nextLevel.type === `genre`) {
        showScreen(getlevelGenreScreen(data));
      }
    }

    playAgainElement.removeEventListener(`click`, onPlayAgainClick);
    answerElements.forEach((it) => it.removeEventListener(`click`, onAnswerClick));
  };

  const saveUserAnswer = (answerElement) => {
    const index = answerElements.indexOf(answerElement);
    const isAnswerRight = data.levelsData[data.currentScreen].answers[index].isAnswerRight;
    const spendedTime = 30;

    if (!isAnswerRight) {
      data.attemptsLeft -= 1;
    }

    data.userAnswers.push({
      isAnswerRight,
      spendedTime
    });
  };

  playAgainElement.addEventListener(`click`, onPlayAgainClick);
  answerElements.forEach((it) => it.addEventListener(`click`, onAnswerClick));

  return levelArtistElement;
};

export default getlevelArtistScreen;
