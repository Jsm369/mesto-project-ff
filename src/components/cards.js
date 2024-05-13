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
  selectedImage.src = imageValue;
  selectedImage.setAttribute('alt', `${titleValue}`);

  deleteButton.addEventListener('click', () => onDelete(cardElement));

  likeButton.addEventListener('click', (e) => onLike(e));

  selectedImage.addEventListener('click', () =>
    onImageClick({ name: titleValue, link: imageValue })
  );

  return cardElement;
};

export const likeCard = (e) => {
  e.target.classList.toggle('card__like-button_is-active');
};

export const deleteCard = (card) => {
  card.remove();
};
