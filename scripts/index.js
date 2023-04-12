const profilePopupElement = document.querySelector('.popup_purpose_profile');
const popupCloseButtonsCollection = document.querySelectorAll('.popup__close-button');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');

const closePopupByEsc = function(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}


//открытие всех попапов]

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//закрытие всех попапов

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

popupCloseButtonsCollection.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  })
})

//закрытие попапов по оверлею

const popupsList = document.querySelectorAll('.popup');

const closePopupByOverlay = function(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
}

popupsList.forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlay);
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

  evt.submitter.classList.add('form__save-button_state_inactive')
  evt.submitter.disabled = true;
};

cardFormElement.addEventListener('submit', handleCardSubmit);
