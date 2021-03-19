export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
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
  }

  // _handleFullImage() {
  //   const popup = document.querySelector('.popup-full-image');

  //   popup.querySelector('.popup__image').src = this._link;
  //   popup.querySelector('.popup__image').alt = this._name;
  //   popup.querySelector('.popup__caption').textContent = this._name;
  //   popup.classList.add('popup_opened');
  // }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeCard());
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDeleteCard());
    // this._element.querySelector('.card__image').addEventListener('click', () => this._handleFullImage());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

}
