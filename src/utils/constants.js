const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__element',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_state_inactive',
  inputErrorClass: 'form__element_type_error',
  errorClass: 'form-error_visible'
}

export const cardFormElement = document.forms["card-form"];
export const profileFormElement = document.forms["user-info"];

export const profilePopupOpenButtonElement = document.querySelector('.profile__edit-button');
export const placePopupOpenButton = document.querySelector('.profile__add-button');

export const imagePopupSelector = '.popup_purpose_image';
export const profilePopupSelector = '.popup_purpose_profile';
export const cardPopupSelector = '.popup_purpose_card';

const info = {
  nameSelector: '.profile__info-name',
  captionSelector: '.profile__info-caption'
}

export {initialCards, validationConfig, info};