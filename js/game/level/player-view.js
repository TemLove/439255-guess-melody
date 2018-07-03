import AbstractView from "../../abstract-view";

export default class PlayerView extends AbstractView {
  constructor(data, audioMap) {
    super(data);
    this._data = data;
    this._audio = audioMap;
    this.isPlaying = false;
  }

  get template() {
    return `<div class="player">
    <button class="player-control player-control--play" type="button" data-src="${this._data}"></button>
    <div class="player-track">
      <span class="player-status"></span>
    </div>
  </div>`;
  }

  bind() {
    this._control = this.element.querySelector(`.player-control`);
    this._control.addEventListener(`click`, this.onPlay);
  }

  play() {
    this._control.classList.toggle(`player-control--pause`);
    this._control.classList.toggle(`player-control--play`);
    this._audio.get(this._control.dataset.src).play().catch(()=> {});
    this.isPlaying = true;
  }

  pause() {
    this._control.classList.toggle(`player-control--pause`);
    this._control.classList.toggle(`player-control--play`);
    this._audio.get(this._control.dataset.src).pause();
    this.isPlaying = false;
  }

  stop() {
    if (this.isPlaying) {
      this._control.classList.toggle(`player-control--pause`);
      this._control.classList.toggle(`player-control--play`);
      this.isPlaying = false;
    }
    this._audio.get(this._control.dataset.src).pause();
    this._audio.get(this._control.dataset.src).currentTime = 0.0;
  }

  onPlay() {

  }

}
