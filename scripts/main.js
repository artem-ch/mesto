let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('input[name="name"]');
let jobInput = formElement.querySelector('input[name="about"]');
let popupCloseButton = formElement.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let profileEditButton = document.querySelector('.profile__edit-button');

function togglePopup(evt) {
  evt.preventDefault();

  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;

  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  popup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
