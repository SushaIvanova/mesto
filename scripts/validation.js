const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__element',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_state_inactive',
  inputErrorClass: 'form__element_type_error',
  errorClass: 'form-error_visible'
}

const enableValidation = ({ formSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
}

const setEventListeners = (form, {inputSelector, submitButtonSelector, ...rest}) => {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);

      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    })
  })
} 

const checkInputValidity = (input, {inputErrorClass, ...rest}) => {
  const currentInputErrorContainer = document.querySelector(`.${input.id}-form-error`);
  
  if (input.validity.valid) {
    currentInputErrorContainer.textContent = '';
    input.classList.remove(inputErrorClass);
  } else {
    currentInputErrorContainer.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  };
}

const hasInvalidInput = (formInputs) => {
  return formInputs.some((input) => {
    return !input.validity.valid;
  });
}

const enableButton = (button, {inactiveButtonClass}) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
}

const disableButton = (button, {inactiveButtonClass}) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
}

enableValidation(validationConfig);
