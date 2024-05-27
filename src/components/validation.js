const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (errorElement) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (errorElement) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (!buttonElement) return;

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const checkInputValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

export const clearValidation = (formElement, config) => {
  const inputElements = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputElements.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement, config);
  });
};

const setEventListener = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      const inputValue = inputElement.value;

      console.log(inputElement.getAttribute('pattern'));

      // const pattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
      const pattern = inputElement.getAttribute('pattern');

      if (pattern) {
        const regex = new RegExp(pattern);
        const isValid = regex.test(inputValue);

        if (!isValid) {
          inputElement.setCustomValidity(
            'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
          );
        } else {
          inputElement.setCustomValidity('');
        }
      }

      checkInputValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  console.log('dsadsa');

  formList.forEach((formElement) => {
    setEventListener(formElement, config);
  });
};
