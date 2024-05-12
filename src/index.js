import '../pages/index.css'
import { initialCards } from './cards'

const cardTemplate = document.querySelector('#card-template').content

const container = document.querySelector('.page')
const cardContainer = container.querySelector('.places__list')

const addCard = (titleValue, imageValue, onClick) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const deleteButton = cardElement.querySelector('.card__delete-button')

  cardElement.querySelector('.card__title').textContent = titleValue
  cardElement.querySelector('.card__image').src = imageValue
  cardElement.querySelector('.card__image').setAttribute('alt', `${titleValue}`)

  deleteButton.addEventListener('click', () => onClick(cardElement))

  return cardElement
}

const deleteCard = (card) => {
  card.remove()
}

initialCards.forEach((item) => {
  cardContainer.append(addCard(item.name, item.link, deleteCard))
})
