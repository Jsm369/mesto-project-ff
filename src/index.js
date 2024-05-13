import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/cards';

import { initialCards } from './components/initialCards';
import { initModal } from './components/modal';

const container = document.querySelector('.page');
const cardContainer = container.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

// popups
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const selectImagePopup = document.querySelector('.popup_type_image');

// profile
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// forms
const editForm = document.forms.edit_profile;
const addCardForm = document.forms.new_place;
//form inputs
const editFormName = editForm.elements.name;
const editFormDescription = editForm.elements.description;
const addCardFormName = addCardForm.elements.place_name;
const addCardFormLink = addCardForm.elements.link;

const setSelectImage = (item) => {
  const caption = selectImagePopup.querySelector('.popup__caption');
  const image = selectImagePopup.querySelector('.popup__image');

  caption.textContent = item.name;
  image.alt = item.name;
  image.src = item.link;
};

// Init Modals
const { closeModal: closeEditModal } = initModal({
  modal: editProfilePopup,
  openTarget: editButton,
  onOpen: () => {
    const popupEditNameValue = editProfilePopup.querySelector(
      '.popup__input_type_name'
    );
    const popupEditDescriptionValue = editProfilePopup.querySelector(
      '.popup__input_type_description'
    );
    popupEditNameValue.value = profileTitle.textContent;
    popupEditDescriptionValue.value = profileDescription.textContent;
  }
});

const { closeModal: closeAddModal } = initModal({
  modal: newCardPopup,
  openTarget: addButton
});

const { openModal: openSelectImagePopup } = initModal({
  modal: selectImagePopup
});

// Submit
editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  profileTitle.textContent = editFormName.value;
  profileDescription.textContent = editFormDescription.value;

  closeEditModal();
});

addCardForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = addCardFormName.value;
  const link = addCardFormLink.value;

  cardContainer.prepend(
    createCard(name, link, deleteCard, likeCard, (item) => {
      setSelectImage(item);
      openSelectImagePopup();
    })
  );

  addCardForm.reset();

  closeAddModal();
});

// Validation
const setSubmitState = (isFormValid, modal) => {
  const saveButton = modal.querySelector('.popup__button');

  if (isFormValid) {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove('popup__button_disabled');
  } else {
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add('popup__button_disabled');
  }
};

console.log(profileTitle.textContent);

editForm.addEventListener('input', () => {
  const isValid =
    editFormName.value.length > 0 && editFormDescription.value.length > 0;

  setSubmitState(isValid, editForm);
});

addCardForm.addEventListener('input', () => {
  const isValid =
    addCardFormName.value.length > 0 && addCardFormLink.value.length > 0;

  setSubmitState(isValid, addCardForm);
});

// render Cards

initialCards.forEach((item) => {
  cardContainer.append(
    createCard(item.name, item.link, deleteCard, likeCard, (item) => {
      setSelectImage(item);
      openSelectImagePopup();
    })
  );
});
