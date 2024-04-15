const cardTemplate = document.querySelector('#card-template').content

const container = document.querySelector('.page')
const cardContainer = container.querySelector('.places__list')

const addCard = (titleValue, imageValue, onClick) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)

  cardElement.querySelector('.card__title').textContent = titleValue
  cardElement.querySelector('.card__image').src = imageValue

  cardContainer.append(cardElement)

  const deleteButton = cardElement.querySelector('.card__delete-button')

  deleteButton.addEventListener('click', () => {
    onClick()
  })
}

const deleteCard = () => {
  const cardDelete = document.querySelector('.card')

  cardDelete.remove()
}

initialCards.forEach((item) => {
  addCard(item.name, item.link, deleteCard)
})
