import {getElementFromTemplate, showScreen} from "./util";
import welcomeScreenElement from "./screen_welcome";
import winResultScreenElement from "./screen_result_win";
import timeoutResultScreenElement from "./screen_result_timeout";
import attemptsResultScreenElement from "./screen_result_attempts";

const template = `<section class="main main--level main--level-genre">
<a class="play-again play-again__wrap" href="#">
  <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
</a>
<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins">05</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">00</span>
  </div>
</svg>
<div class="main-mistakes">
  <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
  <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
  <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
</div>

<div class="main-wrap">
  <h2 class="title">Выберите инди-рок треки</h2>
  <form class="genre">
    <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--pause" type="button"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="answer-1" id="a-1">
      <label class="genre-answer-check" for="a-1"></label>
    </div>

    <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--play" type="button"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="answer-1" id="a-2">
      <label class="genre-answer-check" for="a-2"></label>
    </div>

    <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--play" type="button"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="answer-1" id="a-3">
      <label class="genre-answer-check" for="a-3"></label>
    </div>

    <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--play" type="button"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="answer-1" id="a-4">
      <label class="genre-answer-check" for="a-4"></label>
    </div>

    <button class="genre-answer-send" type="submit">Ответить</button>
  </form>
</div>
</section>`;

const levelGenreElement = getElementFromTemplate(template);
const playAgainElement = levelGenreElement.querySelector(`.play-again`);
const submitButonElement = levelGenreElement.querySelector(`.genre-answer-send`);
const answerLabelElements = [...levelGenreElement.querySelectorAll(`.genre-answer-check`)];
const answerInputElements = [...levelGenreElement.querySelectorAll(`input[name="answer"]`)];
const resultScreens = [winResultScreenElement, timeoutResultScreenElement, attemptsResultScreenElement];

const onPlayAgainClick = () => {
  showScreen(welcomeScreenElement);
};

const onSubmitButtonClick = () => {
  showScreen(resultScreens[Math.floor(Math.random() * resultScreens.length)]);

  answerInputElements.forEach((it) => {
    it.checked = false;
  });
  submitButonElement.disabled = true;
};

const onAnswerClick = (evt) => {
  evt.preventDefault();

  const input = levelGenreElement.querySelector(`#${evt.target.getAttribute(`for`)}`);

  input.checked = !input.checked;
  submitButonElement.disabled = !(answerInputElements.some((it) => it.checked));
};

submitButonElement.disabled = true;
playAgainElement.addEventListener(`click`, onPlayAgainClick);
submitButonElement.addEventListener(`click`, onSubmitButtonClick);
answerLabelElements.forEach((it) => it.addEventListener(`click`, onAnswerClick));

export default levelGenreElement;
