import {splitTimeValues} from "../util";
import {gameOptions, countResultScore, countStatistic} from "../data/game-data";
import ResultsView from "./result-view";
import Application from "../application";
import Loader from "../loader";

const gameResults = [];

export default class ResultScreen {
  constructor(model) {
    this._model = model;
    this.init();
  }

  get view() {
    return this._view;
  }

  init() {
    this._getUserResult();
    this._view = new ResultsView(this._userResult, gameOptions);
    this._view.onReplayClick = () => {
      if (this._userResult.isWin) {
        Loader.loadData().then((data) => Application.showGame(data));
      } else {
        Application.showGame(this._model.data);
      }
    };
  }

  _getUserResult() {
    const isWin = this._model.time > 0 && this._model.attemptsLeft > 0;
    if (!isWin) {
      this._userResult = {
        isWin: false,
        result: this._model.time < 0 ? `timeOut` : `noMoreAttempts`
      };
    } else {
      const userScore = countResultScore(this._model.userAnswers, this._model.attemptsLeft);
      const userStats = countStatistic(gameResults, userScore);
      const quickAnswerCount = this._model.userAnswers.reduce((acc, it) => {
        if (it.spendedTime < gameOptions.Time.QUICK_ANSWER_LIMIT) {
          acc += 1;
        }
        return acc;
      }, 0);
      const time = splitTimeValues(gameOptions.Time.ALL - this._model.time);
      const mistakesCount = gameOptions.attemptsCount - this._model.attemptsLeft;

      this._userResult = {
        isWin: true,
        score: userScore,
        attemptsUsed: mistakesCount,
        timeSpended: time,
        quickAnswers: quickAnswerCount,
        statistic: userStats
      };
    }
  }

}
