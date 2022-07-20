class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {    
    
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    const token = localStorage.getItem('user');
    const jwt = JSON.parse(token).token;
    return {
        'authorization': `Bearer ${jwt}`,
        ...this._headers,
    };
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
    headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    })
    .then(this._checkResponse);
  }
  
  setProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse); 
  }

  setCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })      
    })
    .then(this._checkResponse);    
  }

  deleteCard(data){
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse);      
  }

  changeLikeCardStatus(cardID, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
        method: 'PUT',
        headers: this._getHeaders(),
      })
      .then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
        method: 'DELETE',
        headers: this._getHeaders(),
      })
      .then(this._checkResponse);
    }
  }

  /*setLike(cardID){
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse);
  }

  deleteLike(cardID){
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse);
  }*/

  changeAvatar(imageURL) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: imageURL
      })
    })
    .then(this._checkResponse); 
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;