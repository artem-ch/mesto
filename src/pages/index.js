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
  profileEditPopupSelector,
  cardAddPopupSelector,
  nameInput,
  aboutInput,
  profileEditButton,
  cardAddButton
} from '../utils/constants.js';

import { createCard } from '../utils/utils.js';

const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector, profileAvatarSelector });
const cardList = new Section({
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);
  }
}, containerSelector);

const profileEditValidator = new FormValidator(settings, profileEditPopupSelector);
const cardAddValidator = new FormValidator(settings, cardAddPopupSelector);

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

const profileEditPopup = new PopupWithForm({
  submitter: (inputValues) => {
    api.editProfileInfo(inputValues)
      .then(userData => {
        userInfo.setUserInfo(userData);
        profileEditPopup.close();
      })
      .catch(err => {
        console.log('Ошибка при изменении данных пользователя.', err);
      });
  }
}, profileEditPopupSelector);

profileEditButton.addEventListener('click', () => {
  api.getProfileInfo()
    .then(userData => {
      nameInput.value = userData.name;
      aboutInput.value = userData.about;

      profileEditValidator.resetErrors();
      profileEditPopup.open();
    })
    .catch(err => {
      console.log('Ошибка при получении данных пользователя.', err);
    });
});

const cardAddPopup = new PopupWithForm({
  submitter: (inputValues) => {
    api.addCard(inputValues)
      .then(cardData => {
        const cardElement = createCard(cardData);
        cardList.prependItem(cardElement);
        cardAddPopup.close();
      });
  }
}, cardAddPopupSelector);

cardAddButton.addEventListener('click', () => {
  cardAddValidator.resetErrors();
  cardAddPopup.open();
});


profileEditValidator.enableValidation();
cardAddValidator.enableValidation();
