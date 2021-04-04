import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ submitter }, popupSelector) {
    super(popupSelector);
    this._submitter = (evt) => {
      evt.preventDefault();
      submitter(this._getInputValues());
    };
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    const inputValues = this._inputList.reduce((prevVal, item) => {
      prevVal[item.name] = item.value;
      return prevVal;
    }, {});

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitter);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._submitter);
  }
}
