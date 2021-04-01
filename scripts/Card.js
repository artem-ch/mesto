export default class Card {
  constructor(link, name, cardSelector, handleCardClick) {
    this._link = link;
    this._name = name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handleDeleteCard() {
    this._element.querySelector('.card__delete-button').closest('.card').remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeCard());
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector('.card__image').addEventListener('click', this._handleCardClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector('.card__image');
    imageElement.src = this._link;
    imageElement.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}
