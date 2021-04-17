import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(cardData) {
    super.open();
    this._caption.textContent = cardData.name;
    this._image.alt = cardData.name;
    this._image.src = cardData.link;
  }
}
