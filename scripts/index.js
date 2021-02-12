const initialCards = [
  {
    name: 'Архыз',
    link: './images/mesto-russia-arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: './images/mesto-russia-chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: './images/mesto-russia-ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/mesto-russia-kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: './images/mesto-russia-kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: './images/mesto-russia-baikal.jpg'
  }
];

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const cardTemplate = document.querySelector('.card-template');
const cardsList = document.querySelector('.cards__list');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup-profile-edit');
const editCloseButton = editPopup.querySelector('.popup__close-button');
const editFormElement = editPopup.querySelector('.popup__form');
const editNameInput = editFormElement.querySelector('.popup__input_edit_name');
const editJobInput = editFormElement.querySelector('.popup__input_edit_about');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup-card-add');
const addCloseButton = addPopup.querySelector('.popup__close-button');
const addFormElement = addPopup.querySelector('.popup__form');
const addTitleInput = addFormElement.querySelector('.popup__input_add_title');
const addLinkInput = addFormElement.querySelector('.popup__input_add_link');

const imagePopup = document.querySelector('.popup-full-image');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');
const imageImg = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

function renderCard() {
  const html = initialCards.map(getItem);

  cardsList.append(...html);
}

function getItem(item) {
  const newCard = cardTemplate.content.cloneNode(true);

  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', cardLikeHandler);

  const removeButton = newCard.querySelector('.card__delete-button');
  removeButton.addEventListener('click', cardDeleteHandler);

  cardImage.addEventListener('click', fullImageHandler);

  return newCard;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function profileEditHandler(evt) {
  evt.preventDefault();

  profileName.textContent = editNameInput.value;
  profileAbout.textContent = editJobInput.value;

  closePopup(editPopup);
}

function cardAddHandler(evt) {
  evt.preventDefault();

  const cardsListItem = getItem({
    name: addTitleInput.value,
    link: addLinkInput.value
  });

  cardsList.prepend(cardsListItem);

  closePopup(addPopup);
  addFormElement.reset();
}

function cardLikeHandler(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function cardDeleteHandler(evt) {
  const targetElement= evt.target;
  const targetCard = targetElement.closest('.card');

  targetCard.remove();
}

function fullImageHandler(evt) {
  imageImg.src = evt.target.src;
  imageImg.alt = evt.target.alt;
  imageCaption.textContent = evt.target.alt;

  openPopup(imagePopup);
}

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  editNameInput.value = profileName.textContent;
  editJobInput.value = profileAbout.textContent;
});
editCloseButton.addEventListener('click', () => closePopup(editPopup));
editFormElement.addEventListener('submit', profileEditHandler);

addButton.addEventListener('click', () => openPopup(addPopup));
addCloseButton.addEventListener('click', () => {
  closePopup(addPopup);
  addFormElement.reset();
});
addFormElement.addEventListener('submit', cardAddHandler);

imageCloseButton.addEventListener('click', () => closePopup(imagePopup));

renderCard();
