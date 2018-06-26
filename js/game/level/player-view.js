import AbstractView from "../../abstract-view";

export default class PlayerView extends AbstractView {
  constructor(data) {
    super(data);
    this._data = data;
  }

  get template() {
    return `<div class="player">
    <audio src="${this._data}"></audio>
    <button class="player-control player-control--play"></button>
    <div class="player-track">
      <span class="player-status"></span>
    </div>
  </div>`;
  }

  bind() {
    this._audio = this.element.querySelector(`audio`);
    this._control = this.element.querySelector(`.player-control`);
    this._control.addEventListener(`click`, (evt) => {
      const isPlaying = evt.target.classList.contains(`player-control--pause`);
      if (isPlaying) {
        this.stop();
      } else {
        this.play();
      }
    });
  }

  play() {
    this._control.classList.toggle(`player-control--pause`);
    this._control.classList.toggle(`player-control--play`);
    this._audio.play();
  }

  stop() {
    this._control.classList.toggle(`player-control--pause`);
    this._control.classList.toggle(`player-control--play`);
    this._audio.pause();
  }

}
