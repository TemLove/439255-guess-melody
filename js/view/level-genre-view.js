import AbstractView from "../abstract-view";
import Header from "./level-header-view";

const GENRES = new Map([
  [`Jazz`, `джаз`],
  [`Rock`, `рок`],
  [`Country`, `кантри`],
  [`R&B`, `ритм-н-блюз`],
  [`Pop`, `поп`],
  [`Electronic`, `электро`],
  [`Indie rock`, `инди-рок`]
]);

export default class LevelGenreView extends AbstractView {
  constructor(data) {
    super(data);
    this._data = data;
  }

  get template() {
    const levelData = this._data.levelsData[this._data.currentScreen];
    const question = `<h2 class="title">Выберите ${GENRES.get(levelData.target)} треки</h2>`;
    const answers = levelData.answers.map((track, index) => {
      return `<div class="genre-answer" \
      ${this._data.isTestingMode && track.isAnswerRight ? `style="outline: 2px solid red;"` : ``}>
          <div class="player-wrapper">
            <div class="player">
              <audio src="${track.src}"></audio>
              <button class="player-control player-control--play" type="button"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-${index}" id="a-${index}">
          <label class="genre-answer-check" for="a-${index}"></label>
        </div>`;
    }).join(``);

    const content = `<div class="main-wrap">
    ${question}
    <form class="genre">
      ${answers}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>`;

    return `<section class="main main--level main--level-genre">
  <header></header>
  ${content}
  </section>`;
  }

  _onAnswerClick(evt) {
    evt.preventDefault();

    const input = this.element.querySelector(`#${evt.target.getAttribute(`for`)}`);
    input.checked = !input.checked;

    this._submitButonElement.disabled = !(this._answerInputElements.some((it) => it.checked));
  }

  bind() {
    this._submitButonElement = this.element.querySelector(`.genre-answer-send`);
    this._answerLabelElements = [...this.element.querySelectorAll(`.genre-answer-check`)];
    this._answerInputElements = [...this.element.querySelectorAll(`input[name="answer"]`)];

    this._submitButonElement.disabled = true;

    this._handler = this.onSubmitButtonClick;
    this._answersHandler = this._onAnswerClick.bind(this);
    this._submitButonElement.addEventListener(`click`, this._handler);
    this._answerLabelElements.forEach((it) => it.addEventListener(`click`, this._answersHandler));

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

  getUserAnswer() {
    const answerElement = this._answerInputElements.find((it) => it.checked);
    const index = this._answerInputElements.indexOf(answerElement);
    const isAnswerRight = this._data.levelsData[this._data.currentScreen].answers[index].isAnswerRight;
    const spendedTime = this._data.timer.time - this._newData.timer.time;

    return {
      isAnswerRight,
      spendedTime
    };
  }

  remove() {
    if (this._handler) {
      this._submitButonElement.removeEventListener(`click`, this._handler);
      this._handler = null;
    }

    if (this._answersHandler) {
      this._answerLabelElements.forEach((it) => it.removeEventListener(`click`, this._answersHandler));
      this._answersHandler = null;
    }

    if (this._headerView) {
      this._headerView.remove();
    }

    super.remove();
  }

  onSubmitButtonClick() {

  }

}
