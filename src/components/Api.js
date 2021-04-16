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
}
