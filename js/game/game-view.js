import AbstractView from "../abstract-view";
import Header from "./level/level-header-view";
import ModalView from "./level/modal-view";
import LevelArtistView from "./level/level-artist-view";
import LevelGenreView from "./level/level-genre-view";

export default class GameView extends AbstractView {
  constructor(model) {
    super(model);
    this._model = model;
  }

  get template() {
    return `<section class="main main--level">
  <header></header>
  <div class="main-wrap"></div>
  <div class="modal-screen"></div>
</section>`;
  }

  get players() {
    return this._contentView.players;
  }

  bind() {
    this.updateHeader(this._model);
    this.updateContent(this._model);
  }

  updateHeader(newData) {
    this._headerView = new Header(newData);
    this._headerView.onPlayAgain = this.onModalOpen;
    const headerElement = this.element.querySelector(`header`);

    this.element.replaceChild(this._headerView.element, headerElement);
  }

  updateContent(newData) {
    this._model = newData;
    if (this._model.currentLevel.type === `artist`) {
      this._contentView = new LevelArtistView(this._model);
      this._contentView.onUserAnswer = this.onUserAnswer;
    }

    if (this._model.currentLevel.type === `genre`) {
      this._contentView = new LevelGenreView(this._model);
      this._contentView.onUserAnswer = this.onUserAnswer;
    }
    const contentElement = this.element.querySelector(`.main-wrap`);

    this.element.replaceChild(this._contentView.element, contentElement);

    const firstAudio = this.players[0].element.querySelector(`audio`);
    firstAudio.addEventListener(`canplaythrough`, () => {
      this.players[0].play();
      this.onStartLevel();
    });
  }

  showModal() {
    this._modalView = new ModalView();
    this._modalView.onConfirm = this.onPlayAgain;
    this._modalView.onRefuse = this.onModalClose;

    const modalElement = this.element.querySelector(`.modal-screen`);
    modalElement.appendChild(this._modalView.element);
  }

  closeModal() {
    this._modalView.element.remove();
    this._modalView = null;
  }

  isAnswerRight(answerElement) {
    return this._contentView.isAnswerRight(answerElement);
  }

  onStartLevel() {

  }

  onUserAnswer() {

  }

  onPlayAgain() {

  }

  onModalClose() {

  }

  onModalOpen() {

  }
}
