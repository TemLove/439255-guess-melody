import {splitTimeValues, getRadius, showScreen} from "../util";
import {gameOptions} from "../data/game-data";
import welcomeScreenElement from "../screen-welcome";
import AbstractView from "../abstract-view";

const onPlayAgainClick = () => {
  showScreen(welcomeScreenElement);
};

export default class Header extends AbstractView {
  constructor(data) {
    super(data);
    this._data = data;
  }

  get template() {
    const time = splitTimeValues(this._data.timer.time);
    const mistakesNoteCount = gameOptions.attemptsCount - this._data.attemptsLeft;
    const mistakesNoteMarkup = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49"> `;
    const radius = 370;
    return `\
    <header>
      <a class="play-again play-again__wrap" href="#" ${this._data.timer.time > gameOptions.Time.CRITICAL_LIMIT ? `hidden` : ``}>
        <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
      </a>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="${radius}"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;
          stroke-dasharray: ${getRadius(this._data.timer.time / gameOptions.Time.ALL, radius).stroke};
          stroke-dashoffset: ${getRadius(this._data.timer.time / gameOptions.Time.ALL, radius).offset}"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
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
    this._handler = onPlayAgainClick;

    this._playAgainElement.addEventListener(`click`, this._handler);
  }

}
