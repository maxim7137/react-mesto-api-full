class Api {
  _isServerOk(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  getInitialUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    }).then(this._isServerOk);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    }).then(this._isServerOk);
  }

  setUser({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._isServerOk);
  }

  setAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._isServerOk);
  }

  setCard({ name, link }, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._isServerOk);
  }

  delCard(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    }).then(this._isServerOk);
  }

  likeCard(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    }).then(this._isServerOk);
  }

  dislikeCard(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    }).then(this._isServerOk);
  }
}

const BASE_URL = 'https://api.maxim.nomoredomains.club';

const api = new Api(BASE_URL);
export default api;
