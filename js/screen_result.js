import {getElementFromTemplate, showScreen, splitTimeValues, getWordEnding} from "./util";
import welcomeScreenElement from "./screen_welcome";
import {gameOptions, countResultScore} from "./data/game-data";

const gameResults = [];

export const getTemplate = (gameResultsData, userResult) => {
  let title = ``;
  let content = ``;
  let replayText = `Попробовать ещё раз`;

  if (userResult.timeLeft === 0) {
    title = `Увы и ах!`;
    content = `<div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>`;
  } else if (userResult.attemptsLeft === 0) {
    title = `Какая жалость!`;
    content = `<div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>`;
  } else {
    let results = gameResultsData.slice();
    results.push(userResult.score);
    results.sort((a, b) => a - b);

    const userPosition = results.length - results.indexOf(userResult.score);
    const playersCount = results.length;
    const successPercent = ((playersCount - userPosition) / playersCount).toFixed(2) * 100;
    const time = splitTimeValues(gameOptions.timeAll - userResult.timeLeft);
    const mistakesCount = gameOptions.attemptsCount - userResult.attemptsLeft;

    title = `Вы настоящий меломан!`;
    content = `<div class="main-stat">за&nbsp;${time.minute}&nbsp;минут${getWordEnding(time.minute, [``, `у`, `ы`])} и \
    ${`${time.second}`.padStart(2, `0`)}&nbsp;секунд${getWordEnding(time.second, [``, `у`, `ы`])}
    <br>вы&nbsp;набрали ${userResult.score} балл${getWordEnding(userResult.score, [`ов`, ``, `а`])} \
    (${userResult.quickAnswers} быстры${getWordEnding(userResult.quickAnswers, [`х`, `й`, `х`])})
    <br>совершив ${mistakesCount} ошиб${getWordEnding(mistakesCount, [`ок`, `ку`, `ки`])}</div>
  <span class="main-comparison">Вы заняли ${userPosition} место из ${playersCount}. \
    Это&nbsp;лучше, чем у&nbsp;${successPercent}%&nbsp;игроков</span>`;
    replayText = `Попробовать ещё раз`;
  }

  return `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">${title}</h2>
  ${content}
  <span role="button" tabindex="0" class="main-replay">${replayText}</span>
  </section>`;
};

const getResultScreen = (data) => {
  const userScore = countResultScore(data.userAnswers, data.attemptsLeft);
  const quickAnswerCount = data.userAnswers.reduce((acc, it) => {
    if (it.spendedTime < gameOptions.timeLimitForQuickAnswer) {
      acc += 1;
    }
    return acc;
  }, 0);

  const userResult = {
    score: userScore,
    attemptsLeft: data.attemptsLeft,
    timeLeft: data.timer.time,
    quickAnswers: quickAnswerCount
  };

  const resultScreenElement = getElementFromTemplate(getTemplate(gameResults, userResult));
  const replayElement = resultScreenElement.querySelector(`.main-replay`);

  const onReplayButtonClick = () => {
    showScreen(welcomeScreenElement);
    replayElement.removeEventListener(`click`, onReplayButtonClick);
  };

  replayElement.addEventListener(`click`, onReplayButtonClick);

  return resultScreenElement;
};

export default getResultScreen;
