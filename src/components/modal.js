import { clearValidation, setEventListener } from './validation';

const openModal = (modal) => {
  modal.classList.add('popup_is-opened');

  setEventListener(modal);
};

const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  const formElement = modal.querySelector('.popup__form');

  if (formElement) {
    clearValidation(formElement);
  }
};

export const initModal = ({ modal, openTarget, onOpen }) => {
  const closeButton = modal.querySelector('.popup__close');

  const keyDownHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  const open = () => {
    if (typeof onOpen === 'function') {
      onOpen();
    }
    openModal(modal);
    document.addEventListener('keydown', keyDownHandler);
  };

  const close = () => {
    closeModal(modal);
    document.removeEventListener('keydown', keyDownHandler);
  };

  openTarget && openTarget.addEventListener('click', open);
  closeButton.addEventListener('click', close);

  return {
    closeModal: close,
    openModal: open
  };
};
