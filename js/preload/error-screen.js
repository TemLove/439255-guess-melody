import AbstractView from "../abstract-view";

export default class ErrorScreen extends AbstractView {
  constructor(data) {
    super(data);
    this._data = data;
  }

  get template() {
    return `<section class="modal-error modal-error__wrap">
    <div class="modal-error__inner">
      <h2 class="modal-error__title">Произошла ошибка!</h2>
      <p class="modal-error__text">Статус: ${this._data}. </br> Пожалуйста, перезагрузите страницу.</p>
    </div>
  </section>`;
  }

}
