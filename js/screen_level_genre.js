import {getElementFromTemplate, showScreen} from "./util";
import welcomeScreenElement from "./screen_welcome";
import getlevelArtistScreen from "./screen_level_artist";
import getResultScreen from "./screen_result";
import levelHeader from "./level-header";
import {changeLevel, saveAnswer, canContinue} from "./data/game-data";

const GENRES = new Map([
  [`Jazz`, `джаз`],
  [`Rock`, `рок`],
  [`Country`, `кантри`],
  [`R&B`, `ритм-н-блюз`],
  [`Pop`, `поп`],
  [`Electronic`, `электро`],
  [`Indie rock`, `инди-рок`]
]);

const getTemplate = (data) => {
  const levelData = data.levelsData[data.currentScreen];
  const question = `<h2 class="title">Выберите ${GENRES.get(levelData.target)} треки</h2>`;
  const answers = levelData.answers.map((track, index) => {
    return `<div class="genre-answer" \
    ${data.isTestingMode && track.isAnswerRight ? `style="outline: 2px solid red;"` : ``}>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${track.src}"></audio>
            <button class="player-control player-control--play" type="button"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-${index}" id="a-${index}">
        <label class="genre-answer-check" for="a-${index}"></label>
      </div>`;
  }).join(``);

  const content = `<div class="main-wrap">
  ${question}
  <form class="genre">
    ${answers}
    <button class="genre-answer-send" type="submit">Ответить</button>
  </form>
</div>`;

  return `<section class="main main--level main--level-genre">
${levelHeader(data)}
${content}
</section>`;
};

const onPlayAgainClick = () => {
  showScreen(welcomeScreenElement);
};

const getlevelGenreScreen = (data) => {
  const template = getTemplate(data);
  const levelGenreElement = getElementFromTemplate(template);

  const playAgainElement = levelGenreElement.querySelector(`.play-again`);
  const submitButonElement = levelGenreElement.querySelector(`.genre-answer-send`);
  const answerLabelElements = [...levelGenreElement.querySelectorAll(`.genre-answer-check`)];
  const answerInputElements = [...levelGenreElement.querySelectorAll(`input[name="answer"]`)];

  const onAnswerClick = (evt) => {
    evt.preventDefault();

    const input = levelGenreElement.querySelector(`#${evt.target.getAttribute(`for`)}`);

    input.checked = !input.checked;
    submitButonElement.disabled = !(answerInputElements.some((it) => it.checked));
  };

  const onSubmitButtonClick = (evt) => {
    evt.preventDefault();

    const checkedInput = answerInputElements.find((it) => it.checked);
    const answer = getUserAnswer(checkedInput);
    const gameData = saveAnswer(data, answer);

    const nextLevel = gameData.currentScreen + 1;

    if (canContinue(gameData)) {
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
    submitButonElement.removeEventListener(`click`, onSubmitButtonClick);
    answerLabelElements.forEach((it) => it.removeEventListener(`click`, onAnswerClick));
  };

  const getUserAnswer = (answerElement) => {
    const index = answerInputElements.indexOf(answerElement);
    const isAnswerRight = data.levelsData[data.currentScreen].answers[index].isAnswerRight;
    const spendedTime = 30;

    return {
      isAnswerRight,
      spendedTime
    };
  };

  submitButonElement.disabled = true;
  playAgainElement.addEventListener(`click`, onPlayAgainClick);
  submitButonElement.addEventListener(`click`, onSubmitButtonClick);
  answerLabelElements.forEach((it) => it.addEventListener(`click`, onAnswerClick));

  return levelGenreElement;
};

export default getlevelGenreScreen;
