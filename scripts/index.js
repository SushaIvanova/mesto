const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.edit-button');


const openPopup = function() {
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

const formElement = document.querySelector('.form');
const nameElement = formElement.querySelector('.form__username');
const captionElement = formElement.querySelector('.form__caption');

const nameContainerElement = document.querySelector('.info__name');
const captionContainerElement = document.querySelector('.info__caption');

const handleFormSubmit = function(evt) {
  evt.preventDefault();

  nameContainerElement.textContent = nameElement.value;
  captionContainerElement.textContent = captionElement.value;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

