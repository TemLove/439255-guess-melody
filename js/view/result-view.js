import {getWordEnding} from "../util";
import AbstractView from "../abstract-view";

export default class ResultsView extends AbstractView {
  constructor(data, options) {
    super();
    this._data = data;
    this._options = options;
  }

  get template() {
    let title = ``;
    let content = ``;
    let replayText = `Попробовать ещё раз`;

    if (!this._data.isWin) {
      title = this._data.attemptsUsed === this._options.attemptsCount ? `Какая жалость!` : `Увы и ах!`;
      content = this._data.attemptsUsed === this._options.attemptsCount
        ? `<div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>`
        : `<div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>`;
    }

    if (this._data.isWin) {
      title = `Вы настоящий меломан!`;
      content = `<div class="main-stat">за&nbsp;${this._data.timeSpended.minute}&nbsp;минут\
      ${getWordEnding(this._data.timeSpended.minute, [``, `у`, `ы`])} и \
      ${`${this._data.timeSpended.second}`.padStart(2, `0`)}&nbsp;секунд\
      ${getWordEnding(this._data.timeSpended.second, [``, `у`, `ы`])}
      <br>вы&nbsp;набрали ${this._data.score} балл${getWordEnding(this._data.score, [`ов`, ``, `а`])} \
      (${this._data.quickAnswers} быстры${getWordEnding(this._data.quickAnswers, [`х`, `й`, `х`])})
      <br>совершив ${this._data.attemptsUsed} ошиб${getWordEnding(this._data.attemptsUsed, [`ок`, `ку`, `ки`])}</div>
    <span class="main-comparison">Вы заняли ${this._data.statistic.userPosition} \
    место из ${this._data.statistic.playersCount}. Это&nbsp;лучше, чем \
    у&nbsp;${this._data.statistic.successPercent}%&nbsp;игроков</span>`;
      replayText = `Попробовать ещё раз`;
    }

    return `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">${title}</h2>
    ${content}
    <span role="button" tabindex="0" class="main-replay">${replayText}</span>
    </section>`;
  }

  bind() {
    this._replayElement = this.element.querySelector(`.main-replay`);

    this._handle = this.onReplayClick;
    this._replayElement.addEventListener(`click`, this._handle);
  }

  onReplayClick() {

  }

}
