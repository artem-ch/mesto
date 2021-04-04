export default class Card {
  constructor({ name, link, handleCardClick }, cardSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
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
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  _handleDeleteCard() {
    this._deleteButtonElement.closest('.card').remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', () => this._handleLikeCard());
    this._deleteButtonElement.addEventListener('click', () => this._handleDeleteCard());
    this._imageElement.addEventListener('click', this._handleCardClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButtonElement = this._element.querySelector('.card__like-button');
    this._deleteButtonElement = this._element.querySelector('.card__delete-button');
    this._imageElement = this._element.querySelector('.card__image');
    this._titleElement = this._element.querySelector('.card__title');

    this._titleElement.textContent = this._name;
    this._imageElement.alt = this._name;
    this._imageElement.src = this._link;

    this._setEventListeners();

    return this._element;
  }
}
