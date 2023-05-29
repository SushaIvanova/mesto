
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmFunction) {
    super(popupSelector);
    this._confirmFunction = confirmFunction;
    this._form = this._popup.querySelector('.form');

  }

  open = (card, cardId) => {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmFunction(this._card, this._cardId);
    })
  }
}


