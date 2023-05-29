export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отрисовка всех элементов
  renderItems(items) {
    this._items = items;
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  // принимает ДОМ-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

}
