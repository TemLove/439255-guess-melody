import GameView from "./game-view";
import Application from "../application";

const TIME_INTERVAL = 1000;

export default class GameScreen {
  constructor(model) {
    this._model = model;
    this.init();
  }

  get view() {
    return this._view;
  }

  init() {
    this._view = new GameView(this._model);
    this._view.onStartLevel = () => this.tick();

    this._view.onPlayAgain = () => {
      Application.showPreload();
    };

    this._view.onUserAnswer = (evt) => {
      evt.preventDefault();
      this.stopTimer();

      const answer = this.getUserAnswer(evt.target);
      this._previousAnswerTime = this._model.time;
      this._model = this._model.saveAnswer(answer);

      if (this._model.isOver) {
        this.endGame();
      } else {
        this.continueGame();
      }
    };

    this._view.onModalClose = () => {
      this._view.closeModal();
      this.tick();
    };

    this._view.onModalOpen = () => {
      this.stopTimer();
      this._view.showModal();
    };

  }

  startGame() {
    this._previousAnswerTime = this._model.time;
  }

  continueGame() {
    this._model = this._model.nextLevel(this._model);
    this._view.updateContent(this._model);
  }

  endGame() {
    Application.showResult(this._model);
  }

  tick() {
    this._newTime = this._model.tick();

    if (this._newTime < 0) {
      this.endGame();
    } else {
      this._view.updateHeader(this._model);
      this._timer = setTimeout(() => this.tick(), TIME_INTERVAL);
    }
  }

  stopTimer() {
    clearTimeout(this._timer);
  }

  getUserAnswer(data) {
    const isAnswerRight = this._view.isAnswerRight(data);
    const spendedTime = this._previousAnswerTime - this._model.time;

    return {
      isAnswerRight,
      spendedTime
    };
  }

}
