import './index.css';
import {
  validationConfig, 
  info, 
  cardFormElement, 
  profileFormElement, 
  avatarFormElement,
  profilePopupOpenButtonElement, 
  placePopupOpenButton, 
  avatarPopupOpenButton,
  imagePopupSelector, 
  profilePopupSelector, 
  deletePopupSelector,
  avatarPopupSelector,
  cardPopupSelector} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

// экземпляр класса с API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'b3af4f5b-57cd-4c1b-856a-4aef3b54073b',
    'Content-Type': 'application/json'
  }
}); 

let userId = null;

// получаем инф-ю пользователя и карточки с сервера

const apiMethods = [api.getUserInfo(), api.getCards()];

Promise.all(apiMethods)
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ username: userData.name, caption: userData.about, avatar: userData.avatar, id: userData._id });
    userId = userData._id;
    section.renderItems(cards);
  })
  .catch((error => console.log(`Ошибка ${error}`)))

const userInfo = new UserInfo(info);

// создание новой карточки

const createCard = function(cardObject) {
  const card = new Card(cardObject, cardTemplate, userId, imagePopup.open, deletePopup.open, (likeButton, cardId) => {
   
    if(likeButton.classList.contains('card__like-button_active')) {
      api.deleteLike(cardId)
      .then(res => {
        card.toggleLike(res.likes)
      })
      .catch((error => console.log(`Ошибка ${error}`)))
    } else {
      api.setLike(cardId)
      .then(res => {
      card.toggleLike(res.likes)
      })
      .catch((error => console.log(`Ошибка ${error}`)))
    }
  }); 

  return card.generateCard(); 
}

// экземпляр класса попапа с удалением

const deletePopup = new PopupWithConfirmation(deletePopupSelector, (card, cardId) => {
  api.deleteCard(cardId)
  .then(res => {
    console.log(res);
    card.handleCardDelete();
    deletePopup.close();
  })
  .catch((error => console.log(`Ошибка ${error}`)))
});

deletePopup.setEventListeners();

// экземпляр класса попапа с формой профиля

const profilePopup = new PopupWithForm(profilePopupSelector, (data) => {
  profilePopup.renderLoading(true);
  api.editProfile(data)
    .then(res => {
      const newRes = {username: res.name, caption: res.about, avatar: res.avatar, id: res._id};
      userInfo.setUserInfo(newRes);
      profilePopup.close();
    })
    .catch((error => console.log(`Ошибка ${error}`)))
    .finally(() => {
      profilePopup.renderLoading(false);
    })   
});

profilePopup.setEventListeners();

// открытие попапа профиля 

const openProfilePopup = function() {
  profilePopup.setInputValues(userInfo.getUserinfo());
  profileFormElementValidator.resetValidation();
  // метод открытия попапа из класса Popup
  profilePopup.open();
}

profilePopupOpenButtonElement.addEventListener('click', openProfilePopup);

// экземпляр попапа с формой для добавления карточки

const cardPopup = new PopupWithForm(cardPopupSelector, (data) => {
  cardPopup.renderLoading(true);
  api.addNewCard(data)
    .then(res => {
      console.log(res);
      section.addItem(createCard(res));
      cardPopup.close();
    }) 
    .catch((error => console.log(`Ошибка ${error}`)))
    .finally(() => {
      cardPopup.renderLoading(false);
    })
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

// экземпляр валидатора для формы добавления аватара

const avatarFormElementValidator = new FormValidator(validationConfig, avatarFormElement);
avatarFormElementValidator.enableValidation();

// отрисовка карточек с сервера

const listContainerSelector = '.elements__table';
const cardTemplate = '.card__template'; 

const section = new Section ({ 
  renderer: (cardObject) => { 
    section.addItem(createCard(cardObject)); 
  }
 }, listContainerSelector)



// меняем аватар 

const avatarPopup = new PopupWithForm(avatarPopupSelector, (data) => {
  avatarPopup.renderLoading(true);
  api.editAvatar(data)
    .then(res => {
      const newRes = {username: res.name, caption: res.about, avatar: res.avatar};
      userInfo.setUserInfo(newRes)
      avatarPopup.close();
    })
    .catch((error => console.log(`Ошибка ${error}`)))
    .finally(() => {
      avatarPopup.renderLoading(false);
    })  
});

avatarPopup.setEventListeners();

// попап для изменения аватара

const openAvatarPopup = function() {
  // метод открытия попапа из класса Popup
  avatarPopup.open();

  avatarFormElementValidator.resetValidation();
};

avatarPopupOpenButton.addEventListener('click', openAvatarPopup);




