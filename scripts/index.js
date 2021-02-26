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

const popupList = document.querySelectorAll('.popup');

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

const imagePopup = document.querySelector('.popup-full-image');
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
  likeButton.addEventListener('click', likeCard);

  const removeButton = newCard.querySelector('.card__delete-button');
  removeButton.addEventListener('click', deleteCard);

  cardImage.addEventListener('click', () => openFullImage(item.link, item.name));

  return newCard;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

function resetForm(popup) {
  const formElement = popup.querySelector('.popup__form');
  formElement.reset();
}

function resetErrors(popup) {
  const formElement = popup.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  inputList.forEach(inputElement => hideInputError(formElement, inputElement, {inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible'}));
  toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'popup__submit-button_disabled'});
}

function editProfile(evt) {
  evt.preventDefault();

  profileName.textContent = editNameInput.value;
  profileAbout.textContent = editJobInput.value;

  closePopup(editPopup);
}

function addCard(evt) {
  evt.preventDefault();

  const cardsListItem = getItem({
    name: addTitleInput.value,
    link: addLinkInput.value
  });

  cardsList.prepend(cardsListItem);

  closePopup(addPopup);
  resetForm(addPopup);
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function openFullImage(link, name) {
  imageImg.src = link;
  imageImg.alt = name;
  imageCaption.textContent = name;

  openPopup(imagePopup);
}

editNameInput.value = profileName.textContent;
editJobInput.value = profileAbout.textContent;

editButton.addEventListener('click', () => {
  editNameInput.value = profileName.textContent;
  editJobInput.value = profileAbout.textContent;
  resetErrors(editPopup);
  openPopup(editPopup);
});
editFormElement.addEventListener('submit', editProfile);

addButton.addEventListener('click', () => {
  resetForm(addPopup);
  resetErrors(addPopup);
  openPopup(addPopup);
});
addFormElement.addEventListener('submit', addCard);

popupList.forEach(item => {
  item.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }

    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(item);
    }
  });

});

renderCard();
