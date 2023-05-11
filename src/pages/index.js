import './index.css';
import {
  initialCards, 
  validationConfig, 
  info, 
  cardFormElement, 
  profileFormElement, 
  profilePopupOpenButtonElement, 
  placePopupOpenButton, 
  imagePopupSelector, 
  profilePopupSelector, 
  cardPopupSelector} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';



const userInfo = new UserInfo(info);

// экземпляр класса попапа с формой профиля

const profilePopup = new PopupWithForm(profilePopupSelector, (evt) => {
  evt.preventDefault();

  userInfo.setUserInfo(profilePopup.getInputValues());

  profilePopup.close();
})

// открытие попапа профиля 

const openProfilePopup = function() {
  profilePopup.setInputValues(userInfo.getUserinfo());
  profileFormElementValidator.resetValidation();
  // метод открытия попапа из класса Popup
  profilePopup.open();
}

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);

profilePopup.setEventListeners();

// экземпляр попапа с формой для добавления карточки

const cardPopup = new PopupWithForm(cardPopupSelector, (evt) => {
  evt.preventDefault();

  section.addItem(section._renderer(cardPopup.getInputValues()));

  cardPopup.close();
})

cardPopup.setEventListeners();

// открытие попапа с карточкой

const openPlacePopup = function() {
  // метод открытия попапа из класса Popup
  cardPopup.open();

  cardFormElementValidator.resetValidation();
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