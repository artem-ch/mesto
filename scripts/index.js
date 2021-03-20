// import classes, data and settings
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, settings } from './constants.js';

// select nodes
const popupList = document.querySelectorAll('.popup');
const cardList = document.querySelector('.cards__list');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup-profile-edit');
const editFormElement = editPopup.querySelector('.popup__form');
const editNameInput = editFormElement.querySelector('.popup__input_edit_name');
const editJobInput = editFormElement.querySelector('.popup__input_edit_about');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup-card-add');
const addFormElement = addPopup.querySelector('.popup__form');
const addTitleInput = addFormElement.querySelector('.popup__input_add_title');
const addLinkInput = addFormElement.querySelector('.popup__input_add_link');

// function expressions and event listeners
// opening
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

const openFullImage = (link, name) => {
  const imagePopup = document.querySelector('.popup-full-image');
  const imageImg = imagePopup.querySelector('.popup__image');
  const imageCaption = imagePopup.querySelector('.popup__caption');

  imageImg.src = link;
  imageImg.alt = name;
  imageCaption.textContent = name;

  openPopup(imagePopup);
};

// closing
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

popupList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }

    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(item);
    }
  });
});

// cards
const createCard = (item) => {
  const card = new Card(item.link, item.name, '.card-template');
  const cardElement = card.generateCard();

  cardElement.querySelector('.card__image').addEventListener('click', () => openFullImage(item.link, item.name));

  return cardElement;
};

const renderCard = () => {
  const html = initialCards.map((item) => createCard(item));

  cardList.append(...html);
};

renderCard();

// validation
const resetForm = (popup) => {
  const formElement = popup.querySelector('.popup__form');
  formElement.reset();
};

const editValidator = new FormValidator(settings, editFormElement);
editValidator.enableValidation();

const addValidator = new FormValidator(settings, addFormElement);
addValidator.enableValidation();

// submit
const editProfile = () => {
  profileName.textContent = editNameInput.value;
  profileAbout.textContent = editJobInput.value;

  closePopup(editPopup);
};

const addCard = () => {
  const cardListItem = createCard({
    name: addTitleInput.value,
    link: addLinkInput.value
  });
  cardList.prepend(cardListItem);

  closePopup(addPopup);
};

editButton.addEventListener('click', () => {
  editNameInput.value = profileName.textContent;
  editJobInput.value = profileAbout.textContent;

  editValidator.resetErrors();
  openPopup(editPopup);
});
editFormElement.addEventListener('submit', editProfile);

addButton.addEventListener('click', () => {
  resetForm(addPopup);

  addValidator.resetErrors();
  openPopup(addPopup);
});
addFormElement.addEventListener('submit', addCard);
