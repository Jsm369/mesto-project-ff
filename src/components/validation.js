const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!errorElement) return;

  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input_error-active');
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!errorElement) return;

  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input_error-active');
  errorElement.textContent = errorMessage;
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (!buttonElement) return;

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('inactive');
    buttonElement.removeAttribute('disabled');
  }
};

const checkInputValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

export const clearValidation = (formElement) => {
  const inputElements = Array.from(
    formElement.querySelectorAll('.popup__input')
  );

  inputElements.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement);
    inputElement.classList.remove('popup__input_type_error');
  });
};

export const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      const inputValue = inputElement.value;

      const pattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;

      if (inputElement.classList.contains('validation-with-pattern')) {
        if (inputValue === '') {
          inputElement.setCustomValidity('Заполните это поле.');
        } else {
          const isValid = pattern.test(inputValue);
          if (!isValid) {
            inputElement.setCustomValidity(
              'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
            );
          } else {
            inputElement.setCustomValidity('');
          }
        }
      }

      checkInputValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
