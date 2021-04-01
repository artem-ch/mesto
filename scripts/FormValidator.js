export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    this._submitButtonElement = formElement.querySelector(settings.submitButtonSelector);
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);

    if (hasInvalidInput) {
      this._submitButtonElement.setAttribute('disabled', true);
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButtonElement.removeAttribute('disabled', true);
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {evt.preventDefault()});
    this._setEventListeners();
  }

  resetErrors() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
  }
}
