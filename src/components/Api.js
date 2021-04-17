export default class Api {
  constructor({address, token, cohortId}) {
    this._address = address;
    this._token = token;
    this._cohortId = cohortId;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {

    return fetch(`${this._address}/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }

  getCards() {
    return fetch(`${this._address}/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }

  editProfileInfo(data) {
    return fetch(`${this._address}/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._handleResponse);
  }

  addCard(data) {
    return fetch(`${this._address}/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }

  addLikeCard(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }

  removeLikeCard(cardId) {
    return fetch(`${this._address}/${this._cohortId}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }
}
