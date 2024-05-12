import '../pages/index.css';
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
  setSelectImage
} from './components/cards';
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

// Init Modals
const { closeModal: closeEditModal } = initModal({
  modal: editProfilePopup,
  openTarget: editButton
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

  editForm.reset();
});

addCardForm.addEventListener('submit', (e) => {
  e.preventDefault();

  initialCards.push({
    name: addCardFormName.value,
    link: addCardFormLink.value
  });

  renderCards();

  closeAddModal();

  addCardForm.reset();
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
const renderCards = () => {
  cardContainer.innerHTML = '';

  initialCards.forEach((item) => {
    cardContainer.append(
      createCard(item.name, item.link, deleteCard, likeCard, () => {
        setSelectImage(item.name, item.link, selectImagePopup);
        openSelectImagePopup();
      })
    );
  });
};

renderCards();
