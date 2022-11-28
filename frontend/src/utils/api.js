class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  //запрос
  _fetch(childUrl, method = "GET", headers = null, body = null) {
    return fetch(this._baseUrl + childUrl, {
      headers: headers,
      method: method,
      body: body,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  //Получение данных о пользователе
  getUserInfo() {
    return this._fetch("/users/me");
  }
  //Изменение данных о пользователе
  patchUserInfo(nameUser, aboutUser) {
    return this._fetch(
      "/users/me",
      "PATCH",
      JSON.stringify({
        name: nameUser,
        about: aboutUser,
      })
    );
  }
  //Получение карточек
  getInitialCards() {
    return this._fetch("/cards");
  }
  //Добавление карточек на сервер
  postCard(nameCard, linkCard) {
    return this._fetch(
      "/cards",
      "POST",
      JSON.stringify({
        name: nameCard,
        link: linkCard,
      })
    );
  }
  //Удаление карточки
  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, "DELETE");
  }
  //Лайк карточки
  _addLikeCard(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, "PUT");
  }
  //Удаление лайка карточки
  _removeLikeCard(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, "DELETE");
  }
  //Изменение лайка карточки
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) return this._removeLikeCard(cardId);
    else return this._addLikeCard(cardId);
  }

  //Изменить аватар
  changeAvatar(link) {
    return this._fetch(
      "/users/me/avatar",
      "PATCH",
      JSON.stringify({ avatar: link })
    );
  }

  signup(email, password) {
    return this._fetch(
      "/signup",
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify({
        password: password,
        email: email,
      })
    );
  }

  signin(email, password) {
    return this._fetch(
      "/signin",
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify({
        password: password,
        email: email,
      })
    );
  }

  getUser(token) {
    return this._fetch(
      "/users/me",
      "GET",
      { "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}` }
    );
  }
}

//Создание объекта Api
const api = new Api({
  baseUrl: "https://api.mesto.trufakin.nomoredomains.club",
});

export default api;
