import './pages/index.css';
import { renderCards, renderCard } from './components/card';
import { clearValidation, enableValidation } from './components/validation';
import {
  updateProfile,
  addCard,
  getProfileData,
  updateAvatar,
  getCards
} from './api/api';
import { initModal } from './components/modal';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const container = document.querySelector('.page');
const cardContainer = container.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const changeAvatarButton = document.querySelector('.profile__image');
// popups
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const selectImagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_change-avatar');
// profile
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
// forms
const editForm = document.forms.edit_profile;
const addCardForm = document.forms.new_place;
const avatarForm = document.forms.change_avatar;
//form inputs
const editFormInputName = editForm.elements.name;
const editFormInputDescription = editForm.elements.description;
const addCardFormInputName = addCardForm.elements.place_name;
const addCardFormInputLink = addCardForm.elements.link;
const inputAvatarFormImage = avatarForm.elements.image;

// Init Modals
const { closeModal: closeEditModal } = initModal({
  modal: editProfilePopup,
  openTarget: editButton,
  onOpen: () => {
    editFormInputName.value = profileTitle.textContent;
    editFormInputDescription.value = profileDescription.textContent;
    clearValidation(editForm, config);
  }
});

const { closeModal: closeAddModal } = initModal({
  modal: newCardPopup,
  openTarget: addButton,
  onOpen: () => {
    addCardFormInputName.value = '';
    addCardFormInputLink.value = '';
    clearValidation(addCardForm, config);
  }
});

const { openModal: openSelectImagePopup } = initModal({
  modal: selectImagePopup
});

const { closeModal: closeChangeModal } = initModal({
  modal: avatarPopup,
  openTarget: changeAvatarButton,
  onOpen: () => {
    inputAvatarFormImage.value = '';
    clearValidation(avatarForm, config);
  }
});

avatarForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const saveButton = avatarForm.querySelector('.popup__button');

  const profileDataImage = {
    avatar: inputAvatarFormImage.value
  };

  saveButton.textContent = 'Сохранение...';

  updateAvatar(profileDataImage)
    .then((res) => {
      avatarForm.reset();
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeChangeModal();
    })
    .catch((err) => {
      console.error('Ошибка при изменении аватара:', err);
    })
    .finally(() => {
      saveButton.textContent = '';
    });
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const saveButton = editForm.querySelector('.popup__button');

  const userData = {
    name: editFormInputName.value,
    about: editFormInputDescription.value
  };

  saveButton.textContent = 'Сохранение...';

  updateProfile(userData)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveButton.textContent = '';
    });

  closeEditModal();
});

addCardForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const saveButton = addCardForm.querySelector('.popup__button');

  const cardData = {
    name: addCardFormInputName.value,
    link: addCardFormInputLink.value
  };

  saveButton.textContent = 'Сохранение...';

  addCard(cardData)
    .then((res) => {
      renderCard(
        res,
        cardContainer,
        selectImagePopup,
        openSelectImagePopup,
        res.owner._id,
        true
      );

      addCardForm.reset();
      closeAddModal();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saveButton.textContent = '';
    });
});

const renderProfile = (profileData) => {
  const defaultName = 'Жак-Ив Кусто';
  const defaultAbout = 'Исследователь океана';
  const defaultAvatar = '../../../images/avatar.jpg';

  profileTitle.textContent = profileData.name || defaultName;
  profileDescription.textContent = profileData.about || defaultAbout;
  profileImage.style.backgroundImage = `url(${profileData.avatar || defaultAvatar})`;
};

const init = async () => {
  const promise = Promise.all([getProfileData(), getCards()]);

  const data = await promise;

  renderProfile(data[0]);

  renderCards(
    data[1],
    cardContainer,
    selectImagePopup,
    openSelectImagePopup,
    data[0]._id
  );
};

enableValidation(config);
init();
