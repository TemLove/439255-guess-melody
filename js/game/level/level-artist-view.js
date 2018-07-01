import AbstractView from "../../abstract-view";
import {IS_TESTING_MODE} from "../../data/game-data";
import PlayerView from "./player-view";

export default class LevelArtistView extends AbstractView {
  constructor(model) {
    super(model);
    this._model = model;
    this._players = [];
  }

  get template() {
    const levelData = this._model.currentLevel;
    const answers = levelData.answers.map((track, index) => {
      return `<div class="main-answer-wrapper" \
      ${IS_TESTING_MODE && track.isAnswerRight ? `style="outline: 2px solid red;"` : ``}>
      <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
      <label class="main-answer" for="answer-${index}">
        <img class="main-answer-preview" src="${track.image}"
             alt="${track.artist}" width="134" height="134">
        ${track.artist}
      </label>
    </div>`;
    }).join();

    return `<div class="main-wrap">
    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper">
    </div>
    <form class="main-list">
      ${answers}
    </form>
  </div>`;
  }

  get players() {
    return this._players;
  }

  bind() {
    this._answerElements = [...this.element.querySelectorAll(`.main-answer-wrapper`)];

    this._handler = this.onUserAnswer;
    this._answerElements.forEach((it) => it.addEventListener(`click`, this._handler));

    const player = new PlayerView(this._model.currentLevel.target);
    player.onPlay = () => {
      if (player.isPlaying) {
        player.stop();
      } else {
        player.play();
      }
    };
    this._players.push(player);
    const playerWrapper = this.element.querySelector(`.player-wrapper`);
    playerWrapper.appendChild(player.element);
  }

  isAnswerRight(answerElement) {
    while (!answerElement.classList.contains(`main-answer-wrapper`)) {
      answerElement = answerElement.parentElement;
    }
    const index = this._answerElements.indexOf(answerElement);
    return this._model.currentLevel.answers[index].isAnswerRight;
  }

  onUserAnswer() {

  }
}
