export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const createCard = (
  titleValue,
  imageValue,
  onDelete,
  onLike,
  onImageClick
) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const selectedImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.querySelector('.card__image').src = imageValue;
  cardElement
    .querySelector('.card__image')
    .setAttribute('alt', `${titleValue}`);

  deleteButton.addEventListener('click', () => onDelete(cardElement));

  likeButton.addEventListener('click', (e) => onLike(e));

  selectedImage.addEventListener('click', () => onImageClick());

  return cardElement;
};

export const setSelectImage = (name, link, elem) => {
  const caption = elem.querySelector('.popup__caption');
  const image = elem.querySelector('.popup__image');

  caption.textContent = name;
  image.src = link;
};

export const likeCard = (e) => {
  e.target.classList.toggle('card__like-button_is-active');
};

export const deleteCard = (card) => {
  card.remove();
};
