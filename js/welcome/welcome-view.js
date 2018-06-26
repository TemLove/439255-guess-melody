import AbstractView from "../abstract-view";

const SEC_IN_MINUTE = 60;

export default class WelcomeScreenView extends AbstractView {
  constructor(data) {
    super(data);
    this._data = data;
  }

  get template() {
    return `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${this._data.Time.ALL / SEC_IN_MINUTE} минут ответить на все вопросы.<br>
      Ошибиться можно ${this._data.attemptsCount} раза.<br>
      Удачи!
    </p>
    </section>`;
  }

  bind() {
    this._playElement = this.element.querySelector(`.main-play`);
    this._handler = this.onButtonClick;

    this._playElement.addEventListener(`click`, this._handler);
  }

  onButtonClick() {

  }
}
