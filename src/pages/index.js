import './index.css';

import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import {
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  popupWithImageSelector,
  cardSelector,
  containerSelector,
  settings,
  profileEditPopupSelector,
  avatarEditPopupSelector,
  cardAddPopupSelector,
  popupCardDeleteSelector,
  nameInput,
  aboutInput,
  profileEditButton,
  avatarEditButton,
  cardAddButton
} from '../utils/constants.js';

let userId;

const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector, profileAvatarSelector });

const profileEditValidator = new FormValidator(settings, profileEditPopupSelector);
const cardAddValidator = new FormValidator(settings, cardAddPopupSelector);
const avatarEditValidator = new FormValidator(settings, avatarEditPopupSelector);

const popupWithImage = new PopupWithImage(popupWithImageSelector);
const popupCardDelete = new PopupWithSubmit({
  submitter: (cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        popupCardDelete.card.deleteCardElement();
        popupCardDelete.close();
      })
      .catch(err => {
        console.log('Ошибка при удалении карточки', err);
      });
    }
}, popupCardDeleteSelector);

const createCard = (cardData) => {
  const card = new Card({
    handleCardClick: () => {
      popupWithImage.open(cardData);
    },
    handleDeleteButton: () => {
      popupCardDelete.card = card;
      popupCardDelete.open(cardData);
    },
    handleLikeCard: (evt) => {
      evt.target.classList.contains('card__like-button_active')
      ? api.removeLikeCard(cardData._id)
          .then(cardData => {
            card.toggleLikeClass();
            card.updateLikesCounter(cardData.likes.length);
          })
          .catch(err => {
            console.log('Ошибка при отмене лайка', err);
          })
      : api.addLikeCard(cardData._id)
          .then(cardData => {
            card.toggleLikeClass();
            card.updateLikesCounter(cardData.likes.length);
          })
          .catch(err => {
            console.log('Ошибка во время лайка', err);
          });
      }
    },
    cardData,
    userId,
    cardSelector);

    return card.generateCard();
  };

const cardList = new Section({
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);
  }
}, containerSelector);

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'c5df20be-58d6-4c28-8036-48caeeaa6181',
  cohortId: 'cohort-22'
});

Promise.all([
  api.getProfileInfo(),
  api.getCards()
])
.then(values => {
  const [userData, cards] = values;
  userId = userData._id;

  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);

  cardList.renderItems(cards);
})
.catch(err => {
  console.log('Ошибка при получении данных с сервера', err);
});

const profileEditPopup = new PopupWithForm({
  submitter: (inputValues) => {
    api.editProfileInfo(inputValues)
      .then(userData => {
        userInfo.setUserInfo(userData);
        profileEditPopup.close();
      })
      .catch(err => {
        console.log('Ошибка при изменении данных пользователя', err);
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
      console.log('Ошибка при получении данных пользователя', err);
    });
});

const avatarEditPopup = new PopupWithForm({
  submitter: (inputValues) => {
    api.editAvatar(inputValues)
      .then(userData => {
        userInfo.setUserAvatar(userData);
        avatarEditPopup.close();
      })
      .catch(err => {
        console.log('Ошибка при смене аватара', err)
      });
  }
}, avatarEditPopupSelector);

avatarEditButton.addEventListener('click', () => {
  avatarEditValidator.resetErrors();
  avatarEditPopup.open();
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
avatarEditValidator.enableValidation();
cardAddValidator.enableValidation();
