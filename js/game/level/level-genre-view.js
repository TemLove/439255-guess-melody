import AbstractView from "../../abstract-view";
import {IS_TESTING_MODE} from "../../data/game-data";
import PlayerView from "./player-view";

const GENRES = new Map([
  [`country`, `кантри`],
  [`blues`, `блюз`],
  [`folk`, `фолк`],
  [`classical`, `классические`],
  [`electronic`, `электро`],
  [`hip-hop`, `хип-хоп`],
  [`jazz`, `джаз`],
  [`pop`, `поп`],
  [`rock`, `рок`]
]);

export default class LevelGenreView extends AbstractView {
  constructor(model) {
    super(model);
    this._model = model;
    this._players = [];
  }

  get template() {
    const levelData = this._model.currentLevel;
    const question = `<h2 class="title">Выберите ${GENRES.get(levelData.target)} треки</h2>`;
    const answers = levelData.answers.map((track, index) => {
      return `<div class="genre-answer" \
      ${IS_TESTING_MODE && track.isAnswerRight ? `style="outline: 2px solid red;"` : ``}>
          <div class="player-wrapper">
          </div>
          <input type="checkbox" name="answer" value="answer-${index}" id="a-${index}">
          <label class="genre-answer-check" for="a-${index}"></label>
        </div>`;
    }).join(``);

    return `<div class="main-wrap">
    ${question}
    <form class="genre">
      ${answers}
      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>`;
  }

  get players() {
    return this._players;
  }

  bind() {
    this._submitButonElement = this.element.querySelector(`.genre-answer-send`);
    this._answerLabelElements = [...this.element.querySelectorAll(`.genre-answer-check`)];
    this._answerInputElements = [...this.element.querySelectorAll(`input[name="answer"]`)];

    this._submitButonElement.disabled = true;

    this._handler = this.onUserAnswer;
    this._answersHandler = this._onAnswerClick.bind(this);
    this._submitButonElement.addEventListener(`click`, this._handler);
    this._answerLabelElements.forEach((it) => it.addEventListener(`click`, this._answersHandler));

    const playerWrappers = [...this.element.querySelectorAll(`.player-wrapper`)];
    this._model.currentLevel.answers.forEach((track, index) => {
      const player = new PlayerView(track.src, this._model.audioMap);
      player.onPlay = () => {
        if (this.players[index].isPlaying) {
          this.players[index].pause();
        } else {
          this._players.forEach((it) => {
            if (it.isPlaying) {
              it.pause();
            }
          });
          this.players[index].play();
        }
      };
      this._players[index] = player;

      playerWrappers[index].appendChild(this._players[index].element);
    });
  }

  isAnswerRight() {
    const userAnswers = this._answerInputElements.map((it) => it.checked);
    const isAnswerRight = this._model.currentLevel.answers.reduce((acc, answer, index) => {
      return acc && answer.isAnswerRight === userAnswers[index];
    }, true);
    return isAnswerRight;
  }

  _onAnswerClick(evt) {
    evt.preventDefault();

    const input = this.element.querySelector(`#${evt.target.getAttribute(`for`)}`);
    input.checked = !input.checked;

    this._submitButonElement.disabled = !(this._answerInputElements.some((it) => it.checked));
  }

  onUserAnswer() {

  }

}
