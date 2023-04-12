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
    setEventListeners(form, rest);
  });
}

const setEventListeners = (form, {inputSelector, submitButtonSelector, ...rest}) => {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);

  toggleButtonState(formButton, formInputs, rest);
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input);
      toggleButtonState(formButton, formInputs, rest);
    });
  });
} 

const toggleButtonState = (button, formInputs, {inactiveButtonClass, ...rest}) => {
  if (hasInvalidInput(formInputs)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  };
}

const hasInvalidInput = (formInputs) => {
  return formInputs.some((input) => {
    return !input.validity.valid;
  });
}

const checkInputValidity = (form, input) => {
  if (input.validity.valid) {
    hideInputError(form, input, validationConfig);
  } else {
    showInputError(form, input, validationConfig);
  };
}

const hideInputError = (form, input, {inputErrorClass, ...rest}) => {
  const currentInputErrorContainer = form.querySelector(`.${input.id}-form-error`);
  currentInputErrorContainer.textContent = '';
  input.classList.remove(inputErrorClass);

}

const showInputError = (form, input, {inputErrorClass, ...rest}) => {
  const currentInputErrorContainer = form.querySelector(`.${input.id}-form-error`);
  currentInputErrorContainer.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}





// const checkInputValidity = (input, form, {inputErrorClass}) => {
//   const currentInputErrorContainer = form.querySelector(`.${input.id}-form-error`);
  
//   if (input.validity.valid) {
//     currentInputErrorContainer.textContent = '';
//     input.classList.remove(inputErrorClass);
//   } else {
//     currentInputErrorContainer.textContent = input.validationMessage;
//     input.classList.add(inputErrorClass);
//   };
// }






enableValidation(validationConfig);
