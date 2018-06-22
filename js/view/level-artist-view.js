import AbstractView from "../abstract-view";
import Header from "./level-header-view";

export default class LevelArtistView extends AbstractView {
  constructor(data) {
    super(data);
    this._data = data;
  }

  get template() {
    const levelData = this._data.levelsData[this._data.currentScreen];
    const answers = levelData.answers.map((track, index) => {
      return `<div class="main-answer-wrapper" \
      ${this._data.isTestingMode && track.isAnswerRight ? `style="outline: 2px solid red;"` : ``}>
      <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
      <label class="main-answer" for="answer-${index}">
        <img class="main-answer-preview" src="${track.image}"
             alt="${track.artist}" width="134" height="134">
        ${track.artist}
      </label>
    </div>`;
    }).join();

    const content = `<div class="main-wrap">
    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio src="${levelData.target}"></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">
      ${answers}
    </form>
  </div>`;

    return `<section class="main main--level main--level-artist">
  <header></header>
  ${content}
  </section>`;
  }

  bind() {
    this._answerElements = [...this.element.querySelectorAll(`.main-answer-wrapper`)];

    this._handler = this.onAnswerClick;
    this._answerElements.forEach((it) => it.addEventListener(`click`, this._handler));

    this.updateHeader(this._data);
  }

  updateHeader(newData) {
    const newHeaderView = new Header(newData);
    const headerElement = this._headerView ? this._headerView.element : this.element.querySelector(`header`);

    this.element.replaceChild(newHeaderView.element, headerElement);

    if (this._headerView) {
      this._headerView.remove();
    }

    this._headerView = newHeaderView;
    this._newData = newData;
  }

  getUserAnswer(answerElement) {
    while (!answerElement.classList.contains(`main-answer-wrapper`)) {
      answerElement = answerElement.parentElement;
    }
    const index = this._answerElements.indexOf(answerElement);
    const isAnswerRight = this._data.levelsData[this._data.currentScreen].answers[index].isAnswerRight;
    const spendedTime = this._data.timer.time - this._newData.timer.time;

    return {
      isAnswerRight,
      spendedTime
    };
  }

  remove() {
    if (this._handler) {
      this._answerElements.forEach((it) => it.removeEventListener(`click`, this._handler));
      this._handler = null;
    }

    if (this._headerView) {
      this._headerView.remove();
    }

    super.remove();
  }

  onAnswerClick() {

  }
}
