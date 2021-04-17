export default class Card {
  constructor({ handleCardClick, handleDeleteButton, handleLikeCard }, cardData, userId, cardSelector) {
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeCard = handleLikeCard;
    this._name = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id;
    this._userId = userId;
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

  // _handleLikeCard() {
  //   this._likeButtonElement.classList.toggle('card__like-button_active');
  // }

  deleteCardElement() {
    this._deleteButtonElement.closest('.card').remove();
    this._element = null;
  }

  _cardIsMine() {
    return this._userId === this._ownerId;
  }

  _setEventListeners() {
    // this._likeButtonElement.addEventListener('click', () => this._handleLikeCard());
    this._cardIsMine()
    ? this._deleteButtonElement.addEventListener('click', this._handleDeleteButton)
    : this._deleteButtonElement.remove();
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
