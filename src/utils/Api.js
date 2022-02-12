class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers
  }

  // Проверка ответа от сервера
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json()
    }
  return Promise.reject(`Ошибка: ${res.status}`)
  }

  // Запросить карточки с сервера
  getInitialCards() {
    return fetch (`${this._url}cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  // Добавить/отправить карточку пользователя на сервер
  addUserCard(name, link) {
    return fetch (`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
  }

  // Удаление карточки с сервера
  deleteUserCard(id) {
    return fetch (`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  // Добавление лайка на сервере
  addLike(id) {
    return fetch (`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  // Удаление лайка на сервере
  removeLike(id) {
    return fetch (`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  // Получить данные профиля
  getProfile() {
    return fetch (`${this._url}users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  // Заменить аватар
  changeAvatar(avatar) {
    return fetch (`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse)
  }

  // Отправить данные профиля
  editProfile(name, about) {
    return fetch (`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch (`${this._url}cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  // Получение всех данных от сервера
  getApiInfo() {
    return Promise.all([this.getInitialCards(), this.getProfile()])
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33/',
  headers: {
    authorization: 'bd428fae-42b0-4e58-99f1-8231c317d8e5',
    "content-type": "application/json"
  }
})

export default api


