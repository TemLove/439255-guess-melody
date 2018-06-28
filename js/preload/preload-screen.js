import AbstractView from "../abstract-view";

export default class PreloadScreen extends AbstractView {
  constructor(data) {
    super(data);
    this._data = data;
  }

  get template() {
    return `<section class="main">
    <section class="main-preloader">
      <div class='preloader-wave'>
        <div class='preloader-rect preloader-rect-1'></div>
        <div class='preloader-rect preloader-rect-2'></div>
        <div class='preloader-rect preloader-rect-3'></div>
        <div class='preloader-rect preloader-rect-4'></div>
        <div class='preloader-rect preloader-rect-5'></div>
        <div class='preloader-rect preloader-rect-6'></div>
        <div class='preloader-rect preloader-rect-7'></div>
      </div>
    </section>`;
  }

}
