export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
    this._profileAvatarElement = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileAboutElement.textContent,
      avatar: this._profileAboutElement.src
    };

  }

  setUserInfo({ name, about }) {
    this._profileNameElement.textContent = name;
    this._profileAboutElement.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._profileAvatarElement.src = avatar;
  }
}
