export default class Card {
  constructor(data, templateSelector, userId, handleCardClick, openDeletePopup, likeCard) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._userId = userId;   // мой айди(можно получить методом getUserInfo?????)
    this._likeCard = likeCard; // функция лайка
    this._cardId = data._id;  //id карточки
    this._ownerId = this._data.owner._id; // id других пользователей 
    this._likes = this._data.likes; //массив лайков(польз-лей, лайкнувших карточку)
    this._likesLength = this._likes.length; // длина массива = кол-во лайков 
    this._element = this._getTemplate(); 
    this._likeCounter = this._element.querySelector('.card__like-counter'); //элемент со счетчиком лайк
    this._imageElement = this._element.querySelector('.card__image');
    this._captionElement = this._element.querySelector('.card__caption-text');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButtonElement = this._element.querySelector('.card__delete-button');

    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;
    this._captionElement.textContent = this._data.name;

    this._likeCounter.textContent = this._likesLength;
  }
 
  // проверяем, я ли лайкнула карточку

  _checkIfLiked() {
    this._likes.forEach((user) => {
      if(user._id === this._userId) {
        this._likeButton.classList.add('card__like-button_active');
        return;
      }
    })
   this._likeCounter.textContent = this._likesLength;
  }

  //переключаес вет лайка и меняем счетчик

  toggleLike(likes) {
    this._likeButton.classList.toggle('card__like-button_active');
    this._likeCounter.textContent = likes.length;
  }

  // получаем разметку из темплейта
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  // колбэки обработчиков (каждый - в отдельном методе)
  
  // колбэк удаления 
  handleCardDelete() {
    this._element.remove(); 
  }
    
  // колбэк лайка
  _handleLike() {
    this._likeCard(this._likeButton, this._cardId);
  }

  // колбэк открытия зума картинки
  _handleOpenImagePopup() {
    this._handleCardClick(this._data)
  }

  //колбэк открытия попапа удаления

  _handleOpenPopupDelete = () => {
    this._openDeletePopup(this, this._cardId);
  }

  // накладывает все обработчики событий на КАРТОЧКУ
  _setEventListeners() {
    this._deleteButtonElement.addEventListener('click', () => {
      this._handleOpenPopupDelete();
      
    });


    // устанавливаем кнопку удаления только на свои карточки
    if (this._ownerId !== this._userId) {
     this._deleteButtonElement.remove();
    }

    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._imageElement.addEventListener('click', () => {
      this._handleOpenImagePopup();
    });
  }

  // создает карточку для дальнейшей отрисовки в разметке

  generateCard() {

    this._checkIfLiked();

    this._setEventListeners();
  
    return this._element;
  }
}
