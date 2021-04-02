export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileAboutElement.textContent
    };

  }

  setUserInfo({ name, about }) {
    this._profileNameElement.textContent = name;
    this._profileAboutElement.textContent = about;
  }
}
