import './index.css';
import {initialCards, validationConfig} from '../components/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

const cardFormElement = document.querySelector('.form_purpose_card');
const profileFormElement = document.querySelector('.form_purpose_profile');

const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
const placePopupOpenButton = document.querySelector('.profile__add-button');

const imagePopupSelector = '.popup_purpose_image';
const profilePopupSelector = '.popup_purpose_profile';
const cardPopupSelector = '.popup_purpose_card';

const info = {
  nameSelector: '.profile__info-name',
  captionSelector: '.profile__info-caption'
}

export {info};

const userInfo = new UserInfo(info);

// экземпляр класса попапа с формой профиля

const profilePopup = new PopupWithForm(profilePopupSelector, (evt) => {
  evt.preventDefault();

  userInfo.setUserInfo(profilePopup._getInputValues());

  profilePopup.close();

  cardFormElementValidator.toggleButtonState();
})

// открытие попапа профиля 

const openProfilePopup = function() {
  profilePopup.setInputValues(userInfo.getUserinfo());

  // метод открытия попапа из класса Popup
  profilePopup.open();
}

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);

profilePopup.setEventListeners();

// экземпляр попапа с формой для добавления карточки

const cardPopup = new PopupWithForm(cardPopupSelector, (evt) => {
  evt.preventDefault();

  section.addItem(section._renderer(cardPopup._getInputValues()));

  cardPopup.close();
})

cardPopup.setEventListeners();

// открытие попапа с карточкой

const openPlacePopup = function() {
  // метод открытия попапа из класса Popup
  cardPopup.open();

  cardFormElementValidator.toggleButtonState();
};

placePopupOpenButton.addEventListener('click', openPlacePopup);

// экземпляр попапа - попап картинки

const imagePopup = new PopupWithImage(imagePopupSelector);

imagePopup.setEventListeners();

// экземпляр валидатора для формы редактирования профиля
const profileFormElementValidator = new FormValidator(validationConfig, profileFormElement);
profileFormElementValidator.enableValidation();

// экземпляр валидатора для формы добавления карточки
const cardFormElementValidator = new FormValidator(validationConfig, cardFormElement);
cardFormElementValidator.enableValidation();


// добавление карточек из коробки

const listContainerSelector = '.elements__table';
const cardTemplate = '.card__template'; 

const section = new Section ({ 
  items: initialCards,
  renderer: (cardObject) => {
    const card = new Card(cardObject, cardTemplate, imagePopup.open);

    return card.generateCard();
  }
 }, listContainerSelector)

 section.renderItems();