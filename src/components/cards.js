import { deleteCard, unlikeCard, likeCard } from '../api/api';

export const createCard = (cardData, onDelete, onImageClick, currentUser) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardLike = cardElement.querySelector('.card__like-container');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = cardLike.querySelector('.card__like-count');
  const likeButton = cardLike.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const selectedImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = cardData.name;
  selectedImage.src = cardData.link;
  selectedImage.setAttribute('alt', cardData.name);
  likeCount.textContent = cardData.likes.length;

  if (currentUser !== cardData.owner._id) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () =>
      onDelete(cardElement, cardData._id)
    );
  }

  const likesIds = cardData.likes.map((item) => item._id);
  let isLiked = likesIds.includes(currentUser);

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  const handleClickOnLike = () => {
    if (isLiked) {
      unlikeCard(cardData._id)
        .then(() => {
          likeCount.textContent = parseInt(likeCount.textContent) - 1;
          likeButton.classList.remove('card__like-button_is-active');
          isLiked = false;
        })
        .catch((error) => console.error('Error deleting like:', error));
    } else {
      likeCard(cardData._id)
        .then(() => {
          likeCount.textContent = parseInt(likeCount.textContent) + 1;
          likeButton.classList.add('card__like-button_is-active');
          isLiked = true;
        })
        .catch((error) => console.error('Error setting like:', error));
    }
  };

  likeButton.addEventListener('click', handleClickOnLike);

  selectedImage.addEventListener('click', () =>
    onImageClick(cardData.name, cardData.link)
  );

  return cardElement;
};

const onDeleteCard = (card, cardId) => {
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки:', err);
    });
};

const setSelectImage = (popupElement, item) => {
  const caption = popupElement.querySelector('.popup__caption');
  const image = popupElement.querySelector('.popup__image');

  caption.textContent = item.name;
  image.alt = item.name;
  image.src = item.link;
};

export const renderCard = (
  card,
  cardContainer,
  imagePopup,
  callback,
  currentUser,
  insertBefore = false
) => {
  cardContainer[insertBefore ? 'prepend' : 'append'](
    createCard(
      card,
      onDeleteCard,
      () => {
        setSelectImage(imagePopup, card);
        callback();
      },
      currentUser
    )
  );
};

export const renderCards = (
  cards,
  cardContainer,
  imagePopup,
  callback,
  currentUser
) => {
  cards.forEach((item) => {
    renderCard(item, cardContainer, imagePopup, callback, currentUser);
  });
};
