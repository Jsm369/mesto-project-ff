const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
};

const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
};

export const initModal = ({ modal, openTarget }) => {
  const closeButton = modal.querySelector('.popup__close');

  const keyDownHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  };

  document.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  const open = () => {
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
