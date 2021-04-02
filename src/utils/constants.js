import arkhyz from '../images/mesto-russia-arkhyz.jpg';
import chelyabinsk from '../images/mesto-russia-chelyabinsk-oblast.jpg';
import ivanovo from '../images/mesto-russia-ivanovo.jpg';
import kamchatka from '../images/mesto-russia-kamchatka.jpg';
import kholmogorsky from '../images/mesto-russia-kholmogorsky-rayon.jpg';
import baikal from '../images/mesto-russia-baikal.jpg';

export const initialCards = [
  {
    name: 'Архыз',
    link: arkhyz
  },
  {
    name: 'Челябинская область',
    link: chelyabinsk
  },
  {
    name: 'Иваново',
    link: ivanovo
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Холмогорский район',
    link: kholmogorsky
  },
  {
    name: 'Байкал',
    link: baikal
  }
];

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const containerSelector = '.cards__list';
export const cardSelector = '.card-template';
export const popupWithImageSelector = '.popup-full-image';
export const editPopupSelector = '.popup-profile-edit';
export const addPopupSelector = '.popup-card-add';
export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__about';
export const nameInput = document.querySelector('.popup__input_edit_name');
export const aboutInput = document.querySelector('.popup__input_edit_about');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
