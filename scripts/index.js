const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');


const openPopup = function() {
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

const formElement = document.querySelector('.form');
const nameElement = formElement.querySelector('.form__element_type_username');
const captionElement = formElement.querySelector('.form__element_type_caption');

const nameContainerElement = document.querySelector('.profile__info-name');
const captionContainerElement = document.querySelector('.profile__info-caption');

const handleFormClick = function() {
  openPopup();

  nameElement.value = nameContainerElement.textContent;
  captionElement.value = captionContainerElement.textContent;
}

const handleFormSubmit = function(evt) {
  evt.preventDefault();

  nameContainerElement.textContent = nameElement.value;
  captionContainerElement.textContent = captionElement.value;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

popupOpenButtonElement.addEventListener('click', handleFormClick);
