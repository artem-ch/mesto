import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = super._popup.querySelector('.popup__image');
    this._caption = super._popup.querySelector('.popup__caption');
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    document.addEventListener('keydown', super._handleEscClose);
  }
}
