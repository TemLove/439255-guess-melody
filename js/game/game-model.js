import {gameInitState, gameOptions, changeLevel, saveAnswer} from "../data/game-data";

export default class GameModel {
  constructor(gameData, state = gameInitState) {
    this._state = state;
    this._state.timer.time = gameOptions.Time.ALL;
    this._data = gameData;
  }

  get state() {
    return Object.freeze(this._state);
  }

  get data() {
    return Object.freeze(this._data);
  }

  get attemptsLeft() {
    return this._state.attemptsLeft;
  }

  get currentLevel() {
    return this._data[this._state.currentScreen];
  }

  get time() {
    return this._state.timer.time;
  }

  get userAnswers() {
    return this._state.userAnswers;
  }

  get isOver() {
    return this._state.attemptsLeft === 0 || !this.hasNextLevel;
  }

  get hasNextLevel() {
    const nextLevel = this._data[this._state.currentScreen + 1];
    return nextLevel !== void 0;
  }

  nextLevel(data) {
    this._state = changeLevel(data._state, data._state.currentScreen + 1);
    return this;
  }

  saveAnswer(answer) {
    this._state = saveAnswer(this._state, answer);
    return this;
  }

  tick() {
    return this._state.timer.tick();
  }

}
