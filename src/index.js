import './pages/index.css';
import { renderCards, renderCard } from './components/cards';
import {
  updateProfile,
  addCard,
  getProfileData,
  editAvatar,
  getCards
} from './api/api';
import { initModal } from './components/modal';

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
  }
});

const { closeModal: closeAddModal } = initModal({
  modal: newCardPopup,
  openTarget: addButton,
  onOpen: () => {
    (addCardFormInputName.value = ''), (addCardFormInputLink.value = '');
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
  }
});

avatarForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const saveButton = avatarForm.querySelector('.popup__button');

  const profileDataImage = {
    avatar: inputAvatarFormImage.value
  };

  editAvatar(profileDataImage) // updateAvatar
    .then(() => {
      avatarForm.reset();
      saveButton.textContent = 'Сохранение...';
      profileImage.style.backgroundImage = `url(${profileDataImage.avatar})`;
      closeChangeModal();
    })
    .catch((err) => {
      console.error('Ошибка при изменении аватара:', err);
    });
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const saveButton = editForm.querySelector('.popup__button');

  const userData = {
    name: editFormInputName.value,
    about: editFormInputDescription.value
  };

  updateProfile(userData)
    .then(() => {
      saveButton.textContent = 'Сохранение...';
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
    })
    .catch((err) => {
      console.log(err);
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

  addCard(cardData)
    .then((res) => {
      saveButton.textContent = 'Сохранение...';

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
  const profileData = await getProfileData();
  const initCards = await getCards();

  renderProfile(profileData);

  renderCards(
    initCards,
    cardContainer,
    selectImagePopup,
    openSelectImagePopup,
    profileData._id
  );
};

init();
