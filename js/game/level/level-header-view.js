import {splitTimeValues, getRadius} from "../../util";
import {gameOptions} from "../../data/game-data";
import AbstractView from "../../abstract-view";

export default class Header extends AbstractView {
  constructor(model) {
    super(model);
    this._model = model;
  }

  get template() {
    const time = splitTimeValues(this._model.time);
    const mistakesNoteCount = gameOptions.attemptsCount - this._model.attemptsLeft;
    const mistakesNoteMarkup = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49"> `;
    const radius = 370;
    return `\
    <header>
      <a class="play-again play-again__wrap" href="#" ${this._model.time > gameOptions.Time.CRITICAL_LIMIT ? `hidden` : ``}>
        <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
      </a>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="${radius}"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;
          stroke-dasharray: ${getRadius(this._model.time / gameOptions.Time.ALL, radius).stroke};
          stroke-dashoffset: ${getRadius(this._model.time / gameOptions.Time.ALL, radius).offset}"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml" ${this._model.time > gameOptions.Time.CRITICAL_LIMIT ? `` : `style="color: red;"`}>
          <span class="timer-value-mins">0${time.minute}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${`${time.second}`.padStart(2, `0`)}</span>
        </div>
      </svg>
      <div class="main-mistakes">
        ${mistakesNoteCount > 0 ? new Array(mistakesNoteCount + 1).join(mistakesNoteMarkup) : ``}
      </div>
    </header>`;
  }

  bind() {
    this._playAgainElement = this.element.querySelector(`.play-again`);
    this._handler = this.onPlayAgain;

    this._playAgainElement.addEventListener(`click`, this._handler);
  }

  onPlayAgain() {

  }

}
