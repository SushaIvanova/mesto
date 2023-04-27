export default class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  // получаем разметку из темплейта
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  // колбэки обработчиков (каждый - в отдельном методе)

  // колбэк удаления 
  _handleCardDelete() {
    this._element.remove();
  }

  // колбэк лайка
  _handleLike() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  // колбэк открытия зума картинки
  _handleOpenImagePopup() {
    this._openImagePopup(this._data)
  }

  // накладывает все обработчики событий на КАРТОЧКУ
  _setEventListeners() {
    this._deleteButtonElement.addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._imageElement.addEventListener('click', () => {
      this._handleOpenImagePopup();
    });
  }

  // создает карточку для дальнейшей отрисовки в разметке
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.card__image');
    this._captionElement = this._element.querySelector('.card__caption-text');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButtonElement = this._element.querySelector('.card__delete-button');

    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._captionElement.textContent = this._data.name;

    this._setEventListeners();
  
    return this._element;
  }
}