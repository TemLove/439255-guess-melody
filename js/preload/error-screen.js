import AbstractView from "../abstract-view";

const ERROR_MESSAGE = {
  400: `Неверный запрос.`,
  401: `Пользователь не авторизован.`,
  404: `'Ничего не найдено.`,
  500: `Ошибка сервера.`
};

export default class ErrorScreen extends AbstractView {
  constructor(data) {
    super(data);
    this._data = data;
  }

  get template() {
    const message = ERROR_MESSAGE[this._data] ? ERROR_MESSAGE[this._data] : ``;

    return `<section class="modal-error modal-error__wrap">
    <div class="modal-error__inner">
      <h2 class="modal-error__title">Произошла ошибка!</h2>
      <p class="modal-error__text">Статус: ${this._data}. ${message} Пожалуйста, перезагрузите страницу.</p>
    </div>
  </section>`;
  }

}
