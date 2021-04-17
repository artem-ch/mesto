import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  cardSelector,
  popupWithImageSelector,
} from './constants.js';

const popupWithImage = new PopupWithImage(popupWithImageSelector);

export const createCard = (cardData) => {
  const card = new Card({
    handleCardClick: () => {
      popupWithImage.open(cardData);
    }
  },
  cardData,
  cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
};
