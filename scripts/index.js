const profilePopupElement = document.querySelector('.popup_purpose_profile');
const popupCloseButtonsCollection = document.querySelectorAll('.popup__close-button');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');

//открытие всех попапов

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
}

//закрытие всех попапов

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
}

popupCloseButtonsCollection.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  })
})

const profileFormElement = document.querySelector('.form_purpose_profile');
const nameElement = profileFormElement.querySelector('.form__element_type_username');
const captionElement = profileFormElement.querySelector('.form__element_type_caption');

const nameContainerElement = document.querySelector('.profile__info-name');
const captionContainerElement = document.querySelector('.profile__info-caption');

const openProfilePopup = function() {
  openPopup(profilePopupElement);

  nameElement.value = nameContainerElement.textContent;
  captionElement.value = captionContainerElement.textContent;
}

const handleProfileFormSubmit = function(evt) {
  evt.preventDefault();

  nameContainerElement.textContent = nameElement.value;
  captionContainerElement.textContent = captionElement.value;

  closePopup(profilePopupElement);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);

//попап для добавления карточки

const placePopupElement = document.querySelector('.popup_purpose_card');
const placePopupOpenButton = document.querySelector('.profile__add-button');

const openPlacePopup = function() {
  openPopup(placePopupElement);
};

placePopupOpenButton.addEventListener('click', openPlacePopup);

//карточки из коробки при загрузке

const cardTemplate = document.querySelector('.card__template');
const list = document.querySelector('.elements__table');

const imagePopupElement = document.querySelector('.popup_purpose_image');
const popupImageElement = imagePopupElement.querySelector('.popup__image');
const popupImageTitleElement = imagePopupElement.querySelector('.popup__image-title');

const  createCard = function (card) {
  const cardTemplateElement = cardTemplate.content.cloneNode(true);
  const imageElement = cardTemplateElement.querySelector('.card__image');
  const captionElement = cardTemplateElement.querySelector('.card__caption-text');

  imageElement.src = card.link;
  imageElement.alt = card.name;
  captionElement.textContent = card.name;

  //лайк

  const likeButton = cardTemplateElement.querySelector('.card__like-button');
  const pressLike = function () {
    likeButton.classList.toggle('card__like-button_active');
  }

  likeButton.addEventListener('click', pressLike);

  // удаление карточки

  const deleteButtonElement = cardTemplateElement.querySelector('.card__delete-button');
  const handleCardDelete = function () {
    const listItem = deleteButtonElement.closest('.card');
    listItem.remove();
  };
  deleteButtonElement.addEventListener('click', handleCardDelete);

  // попап для картинки
  
  const openImagePopup = function () {
    popupImageElement.src = card.link;
    popupImageElement.alt = card.name;
    popupImageTitleElement.textContent = card.name;
    openPopup(imagePopupElement);
  }

  imageElement.addEventListener('click', openImagePopup);

  closePopup(imagePopupElement);
  
  return cardTemplateElement;
};

const uploadInitialCards = function (card) {
  list.append(createCard(card));
}

initialCards.forEach(uploadInitialCards);

//добавление карточки по сабмиту

const cardFormElement = document.querySelector('.form_purpose_card');
const placeElement = cardFormElement.querySelector('.form__element_type_place');
const linkElement = cardFormElement.querySelector('.form__element_type_link');

const placeContainerElement = document.querySelector('.card__caption-text');
const linkContainerElement = document.querySelector('.card__image');

const handleCardSubmit = function(evt) {
  evt.preventDefault();

  const cardObject = {name: placeElement.value, link: linkElement.value};
  
  list.prepend(createCard(cardObject));
  
  closePopup(placePopupElement);

  cardFormElement.reset();
};

cardFormElement.addEventListener('submit', handleCardSubmit);
