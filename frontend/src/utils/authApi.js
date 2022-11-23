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
const apiAuth = new Api({
  baseUrl: "https://auth.nomoreparties.co",
});

export default apiAuth;
