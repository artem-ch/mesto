import './index.css';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  settings,
  containerSelector,
  editPopupSelector,
  addPopupSelector,
  profileNameSelector,
  profileAboutSelector,
  nameInput,
  aboutInput,
  editButton,
  addButton
} from '../utils/constants.js';
import { createCard } from '../utils/utils.js';

const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector });
const editValidator = new FormValidator(settings, editPopupSelector);
const addValidator = new FormValidator(settings, addPopupSelector);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, containerSelector);

const editPopup = new PopupWithForm({
  submitter: ({ name, about }) => {
    userInfo.setUserInfo({ name, about })

    editPopup.close();
  }
}, editPopupSelector);

editButton.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;

  editValidator.resetErrors();
  editPopup.open();
});

const addPopup = new PopupWithForm({
  submitter: ({ name, link }) => {
    const cardElement = createCard({ name, link });
    cardList.prependItem(cardElement);
    addPopup.close();
  }
}, addPopupSelector);

addButton.addEventListener('click', () => {
  addValidator.resetErrors();
  addPopup.open();
});


cardList.renderItems();
editValidator.enableValidation();
addValidator.enableValidation();
