import { deleteCard, unlikeCard, likeCard } from '../api/api';

export const createCard = (
  cardData,
  onDelete,
  onLike,
  onDeleteLike,
  onImageClick,
  currentUserId
) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const selectedImage = cardElement.querySelector('.card__image');
  const cardLike = cardElement.querySelector('.card__like-container');

  const likeButton = cardLike.querySelector('.card__like-button');
  const likeCount = cardLike.querySelector('.card__like-count');

  cardTitle.textContent = cardData.name;
  selectedImage.src = cardData.link;
  selectedImage.setAttribute('alt', cardData.name);

  likeCount.textContent = cardData.likes.length;

  if (currentUserId !== cardData.owner._id) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () =>
      onDelete(cardElement, cardData._id)
    );
  }

  let isLiked = cardData.likes.some((item) => item._id === currentUserId);

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    if (isLiked) {
      onDeleteLike(likeCount, cardData);
      likeButton.classList.remove('card__like-button_is-active');
      isLiked = false;
    } else {
      onLike(likeCount, cardData);
      likeButton.classList.add('card__like-button_is-active');
      isLiked = true;
    }
  });

  selectedImage.addEventListener('click', () =>
    onImageClick(cardData.name, cardData.link)
  );

  return cardElement;
};

const like = (likeCount, cardData) => {
  likeCard(cardData._id)
    .then((res) => {
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err, 'Ошибка при лайке');
    });
};

const unLike = (likeCount, cardData) => {
  unlikeCard(cardData._id)
    .then((res) => {
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err, 'Ошибка при удалении лайка');
    });
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
  currentUserId,
  insertBefore = false
) => {
  cardContainer[insertBefore ? 'prepend' : 'append'](
    createCard(
      card,
      onDeleteCard,
      like,
      unLike,
      () => {
        setSelectImage(imagePopup, card);
        callback();
      },
      currentUserId
    )
  );
};

export const renderCards = (
  cards,
  cardContainer,
  imagePopup,
  callback,
  currentUserId
) => {
  cards.forEach((item) => {
    renderCard(item, cardContainer, imagePopup, callback, currentUserId);
  });
};
