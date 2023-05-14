export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отрисовка всех элементов
  renderItems() {
    this._items.forEach(item => {
      this.addItem(this.renderer(item));
    });
  }

  // принимает ДОМ-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
