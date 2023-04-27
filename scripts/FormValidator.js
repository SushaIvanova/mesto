
export default class FormValidator {
  constructor(validationConfig, form) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._form = form;
  }

  // скрывает сообщение об ошибке
  _hideInputError(input) {
    const currentInputErrorContainer = this._form.querySelector(`.${input.id}-form-error`);
    currentInputErrorContainer.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }

  // показывает сообщение об ошибке
  
  _showInputError(input) {
    const currentInputErrorContainer = this._form.querySelector(`.${input.id}-form-error`);
    currentInputErrorContainer.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  // проверяет валидность поля
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    };
  }

  // проверяет наличие невалидного поля

  _hasInvalidInput() {
    return this._formInputs.some((input) => {
      return !input.validity.valid;
    });
  }

  // изменяет состояние кнопки сабмита
  _toggleButtonState(button) {
    if (this._hasInvalidInput()) {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    };
  }

  // устанавливает все обработчики
  _setEventListeners() {
    this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._formButton = this._form.querySelector(this._submitButtonSelector);

    this._formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(this._formButton);
      });
    });
  }

  // включает валидацию формы
  enableValidation() {
    this._setEventListeners();
  }
}

