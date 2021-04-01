export default class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._profileNameElement = document.querySelector(profileName);
    this._profileAboutElement = document.querySelector(profileAbout);
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileAboutElement.textContent
    };

  }

  setUserInfo(name, about) {
    this._profileNameElement.textContent = name;
    this._profileNameElement.textContent = about;
  }
}
