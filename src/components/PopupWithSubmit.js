import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ submitter }, popupSelector) {
    super(popupSelector);
    this._submitter = (evt) => {
      evt.preventDefault();
      submitter(this._id);
    };
    this._form = this._popup.querySelector('.popup__form');
  }

  open(data) {
    super.open();
    this._id = data._id;
  }

  close() {
    super.close();
    this.card = null;
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
