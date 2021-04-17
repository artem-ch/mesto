import './index.css';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  containerSelector,
  settings,
  editPopupSelector,
  addPopupSelector,
  nameInput,
  aboutInput,
  editButton,
  addButton
} from '../utils/constants.js';

import { createCard } from '../utils/utils.js';

const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector, profileAvatarSelector });
const cardList = new Section({
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);
  }
}, containerSelector);

// const editValidator = new FormValidator(settings, editPopupSelector);
// const addValidator = new FormValidator(settings, addPopupSelector);

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'c5df20be-58d6-4c28-8036-48caeeaa6181',
  cohortId: 'cohort-22'
});

api.getProfileInfo()
  .then(userData => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  .catch(err => {
    console.log('Ошибка при получении данных пользователя.', err);
  });

api.getCards()
  .then(cards => {
    cardList.renderItems(cards);
  })
  .catch(err => {
    console.log('Ошибка при получении карточек.', err);
  });



// const editPopup = new PopupWithForm({
//   submitter: ({ name, about }) => {
//     userInfo.setUserInfo({ name, about })

//     editPopup.close();
//   }
// }, editPopupSelector);

// editButton.addEventListener('click', () => {
//   nameInput.value = userInfo.getUserInfo().name;
//   aboutInput.value = userInfo.getUserInfo().about;

//   editValidator.resetErrors();
//   editPopup.open();
// });

// const addPopup = new PopupWithForm({
//   submitter: ({ name, link }) => {
//     const cardElement = createCard({ name, link });
//     cardList.prependItem(cardElement);
//     addPopup.close();
//   }
// }, addPopupSelector);

// addButton.addEventListener('click', () => {
//   addValidator.resetErrors();
//   addPopup.open();
// });


// cardList.renderItems();
// editValidator.enableValidation();
// addValidator.enableValidation();
