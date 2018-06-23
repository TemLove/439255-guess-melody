import {showScreen, splitTimeValues} from "./util";
import welcomeScreenElement from "./screen-welcome";
import {gameOptions, countResultScore, countStatistic} from "./data/game-data";
import ResultsView from "./view/result-view";

const gameResults = [];

const getResultScreen = (data) => {
  const userScore = countResultScore(data.userAnswers, data.attemptsLeft);
  const userStats = countStatistic(gameResults, userScore);
  const quickAnswerCount = data.userAnswers.reduce((acc, it) => {
    if (it.spendedTime < gameOptions.Time.QUICK_ANSWER_LIMIT) {
      acc += 1;
    }
    return acc;
  }, 0);

  const time = splitTimeValues(gameOptions.Time.ALL - data.timer.time);
  const mistakesCount = gameOptions.attemptsCount - data.attemptsLeft;


  const userResult = {
    isWin: data.timeLeft !== 0 && data.attemptsLeft !== 0,
    score: userScore,
    attemptsUsed: mistakesCount,
    timeSpended: time,
    quickAnswers: quickAnswerCount,
    statistic: userStats
  };

  const resultScreenView = new ResultsView(userResult, gameOptions);
  resultScreenView.onReplayClick = () => {
    showScreen(welcomeScreenElement);
  };

  return resultScreenView.element;
};

export default getResultScreen;
