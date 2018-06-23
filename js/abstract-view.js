export default class AbstractView {

  get template() {
    throw new Error(`This method should be defined`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }

    return this._element;
  }

  render() {
    const domParser = new DOMParser();
    return domParser.parseFromString(this.template, `text/html`).body.firstElementChild;
  }

  bind() {

  }

}
