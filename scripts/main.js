let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

let popupCloseButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input_content_name');
let jobInput = formElement.querySelector('.popup__input_content_about');

function openPopup() {
  popup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  closePopup();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
