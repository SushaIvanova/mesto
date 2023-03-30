const popupElement = document.querySelector('.popup');
const profilePopupElement = document.querySelector('.popup_purpose_profile');
const popupElementsCollection = document.querySelectorAll('.popup');
const popupCloseButtonsCollection = document.querySelectorAll('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

console.log(profilePopupElement);

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

const formElement = document.querySelector('.form');
const nameElement = formElement.querySelector('.form__element_type_username');
const captionElement = formElement.querySelector('.form__element_type_caption');

const nameContainerElement = document.querySelector('.profile__info-name');
const captionContainerElement = document.querySelector('.profile__info-caption');

const handleFormClick = function() {
  openPopup(profilePopupElement);

  nameElement.value = nameContainerElement.textContent;
  captionElement.value = captionContainerElement.textContent;
}

const handleFormSubmit = function(evt) {
  evt.preventDefault();

  nameContainerElement.textContent = nameElement.value;
  captionContainerElement.textContent = captionElement.value;

  closePopup(profilePopupElement);
}

formElement.addEventListener('submit', handleFormSubmit);

popupOpenButtonElement.addEventListener('click', handleFormClick);


//попап для добавления карточки

const placePopupElement = document.querySelector('.popup_purpose_card');
const placePopupOpenButton = document.querySelector('.profile__add-button');

const openPlacePopup = function() {
  openPopup(placePopupElement);
};

placePopupOpenButton.addEventListener('click', openPlacePopup);

//карточки из коробки при загрузке

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
    popupImageTitleElement.textContent = card.name;
    openPopup(imagePopupElement);
  }

  imageElement.addEventListener('click', openImagePopup);

  closePopup(imagePopupElement);
  
  return cardTemplateElement;
};

const uploadCards = function (card) {
  list.append(createCard(card));
}

initialCards.forEach(uploadCards);


//добавление карточки по сабмиту

const cardFormElement = document.querySelector('.form_purpose_card');
const placeElement = cardFormElement.querySelector('.form__element_type_place');
const linkElement = cardFormElement.querySelector('.form__element_type_link');

const placeContainerElement = document.querySelector('.card__caption-text');
const linkContainerElement = document.querySelector('.card__image');

console.log(placePopupElement);

const handleCardSubmit = function(evt) {
  evt.preventDefault();

  const cardObject = {name: placeElement.value, link: linkElement.value};
  placeElement.value = '';
  linkElement.value = '';

  list.prepend(createCard(cardObject));
  closePopup(placePopupElement);
};

cardFormElement.addEventListener('submit', handleCardSubmit);
