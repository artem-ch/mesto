import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitter) {
    super(popupSelector);
    this._form = super._popup.querySelector('.popup__form')
    this._submitter = submitter;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputValues = super._popup.querySelectorAll('.popup__input').map((inputElement) => inputElement.value);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.setEventListeners('submit', this._submitter);
  }
}
