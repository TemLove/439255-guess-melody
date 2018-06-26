import AbstractView from "../../abstract-view";

export default class ModalView extends AbstractView {
  constructor(model) {
    super(model);
    this._model = model;
  }

  get template() {
    return `<section class="modal-confirm modal-confirm__wrap">
    <form class="modal-confirm__inner">
      <button class="modal-confirm__close" type="button">Закрыть</button>
      <h2 class="modal-confirm__title">Подтверждение</h2>
      <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal-confirm__btn-wrap">
        <button class="modal-confirm__btn">Ок</button>
        <button class="modal-confirm__btn">Отмена</button>
      </div>
    </form>
    </section>`;
  }

  bind() {
    [this._closeButton, this._okButton, this._cancelButton] = [...this.element.querySelectorAll(`button`)];

    this._closeButton.addEventListener(`click`, this.onRefuse);
    this._cancelButton.addEventListener(`click`, this.onRefuse);
    this._okButton.addEventListener(`click`, this.onConfirm);
  }

  onConfirm() {

  }

  onRefuse() {

  }
}
