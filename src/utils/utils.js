import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  cardSelector,
  popupWithImageSelector,
} from './constants.js';

export const createCard = ({ name, link }) => {
  const card = new Card({
    name,
    link,
    handleCardClick: () => {
      const popupWithImage = new PopupWithImage(popupWithImageSelector);
      popupWithImage.open(name, link);
    }
  }, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
};
