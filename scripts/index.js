import initialCards from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profilePopupElement = document.querySelector('.popup_purpose_profile');
const popupCloseButtonsCollection = document.querySelectorAll('.popup__close-button');
const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');

const closePopupByEsc = function(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

// открытие всех попапов]

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// закрытие всех попапов

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

// закрытие попапов по оверлею

const popupsList = document.querySelectorAll('.popup');

const closePopupByOverlay = function(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
}

popupsList.forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlay);
})

const cardTemplate = '.card__template';

// попап для картинки
  
const openImagePopup = function (data) {
  popupImageElement.src = data.link;
  popupImageElement.alt = data.name;
  popupImageTitleElement.textContent = data.name;
  openPopup(imagePopupElement);
}

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

// попап для добавления карточки

const placePopupElement = document.querySelector('.popup_purpose_card');
const placePopupOpenButton = document.querySelector('.profile__add-button');

const openPlacePopup = function() {
  openPopup(placePopupElement);
};

placePopupOpenButton.addEventListener('click', openPlacePopup);

// карточки из коробки при загрузке

const list = document.querySelector('.elements__table');

const imagePopupElement = document.querySelector('.popup_purpose_image');
const popupImageElement = imagePopupElement.querySelector('.popup__image');
const popupImageTitleElement = imagePopupElement.querySelector('.popup__image-title');

const  createCard = function (card) {
  
};

const uploadInitialCards = function(list, card) {
  list.append(card);
}

initialCards.forEach(element => {

  // создает экземпляр класса Card
  const card = new Card (element, cardTemplate, openImagePopup);
  
  uploadInitialCards(list, card.generateCard());
});

// добавление карточки по сабмиту

const cardFormElement = document.querySelector('.form_purpose_card');
const placeElement = cardFormElement.querySelector('.form__element_type_place');
const linkElement = cardFormElement.querySelector('.form__element_type_link');

const placeContainerElement = document.querySelector('.card__caption-text');
const linkContainerElement = document.querySelector('.card__image');

const handleCardSubmit = function(evt) {
  evt.preventDefault();

  const cardObject = {name: placeElement.value, link: linkElement.value};

  // создает экземпляр класса Card
  const card = new Card(cardObject, cardTemplate, openImagePopup);
  
  list.prepend(card.generateCard());
  
  closePopup(placePopupElement);

  cardFormElement.reset();

  evt.submitter.classList.add('form__save-button_state_inactive')
  evt.submitter.disabled = true;
};

cardFormElement.addEventListener('submit', handleCardSubmit);

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__element',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_state_inactive',
  inputErrorClass: 'form__element_type_error',
  errorClass: 'form-error_visible'
}

// экземпляр для формы редактирования профиля
const profileFormElementValidator = new FormValidator(validationConfig, profileFormElement);
profileFormElementValidator.enableValidation();

// экземпляр для формы добавления карточки
const cardFormElementValidator = new FormValidator(validationConfig, cardFormElement);
cardFormElementValidator.enableValidation();