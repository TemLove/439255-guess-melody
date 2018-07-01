import {splitTimeValues} from "../util";
import {gameOptions, countResultScore, countStatistic} from "../data/game-data";
import ResultsView from "./result-view";
import Application from "../application";
import Loader from "../loader";

export default class ResultScreen {
  constructor(data, state, options = gameOptions) {
    this._data = data;
    this._state = state;
    this._options = options;
    this.init();
  }

  get view() {
    return this._view;
  }

  init() {
    this._getUserResult();
    if (this._userResult.isWin) {
      console.log(this._userResult);
      Loader.saveResult(this._userResult);
    }
    const statistic = countStatistic(this._data, this._userResult.score);
    this._view = new ResultsView(statistic, this._userResult, gameOptions);
    this._view.onReplayClick = () => {
      if (this._userResult.isWin) {
        Loader.loadData()
        .then((data) => Application.showGame(data));
      } else {
        Application.showGame(this._state.data);
      }
    };
  }

  _getUserResult() {
    const isWin = this._state.time > 0 && this._state.attemptsLeft > 0;
    if (!isWin) {
      this._userResult = {
        isWin: false,
        result: this._state.time < 0 ? `timeOut` : `noMoreAttempts`
      };
    } else {

      const userScore = countResultScore(this._state.userAnswers, this._state.attemptsLeft);
      const quickAnswerCount = this._state.userAnswers.reduce((acc, it) => {
        if (it.spendedTime < gameOptions.Time.QUICK_ANSWER_LIMIT) {
          acc += 1;
        }
        return acc;
      }, 0);
      const time = splitTimeValues(gameOptions.Time.ALL - this._state.time);
      const mistakesCount = gameOptions.attemptsCount - this._state.attemptsLeft;

      this._userResult = {
        isWin: true,
        score: userScore,
        attemptsUsed: mistakesCount,
        timeSpended: time,
        quickAnswers: quickAnswerCount,
      };
    }
  }

}
