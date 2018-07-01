import AbstractView from "../../abstract-view";

export default class PlayerView extends AbstractView {
  constructor(data) {
    super(data);
    this._data = data;
    this.isPlaying = false;
  }

  get template() {
    return `<div class="player">
    <audio src="${this._data}"></audio>
    <button class="player-control player-control--play" type="button"></button>
    <div class="player-track">
      <span class="player-status"></span>
    </div>
  </div>`;
  }

  bind() {
    this._audio = this.element.querySelector(`audio`);
    this._audio.load();
    this._control = this.element.querySelector(`.player-control`);
    this._control.addEventListener(`click`, this.onPlay);
  }

  play() {
    this._control.classList.toggle(`player-control--pause`);
    this._control.classList.toggle(`player-control--play`);
    this._audio.play();
    this.isPlaying = true;
  }

  stop() {
    this._control.classList.toggle(`player-control--pause`);
    this._control.classList.toggle(`player-control--play`);
    this._audio.pause();
    this.isPlaying = false;
  }

  onPlay() {

  }

}
