import { API } from './config';
import { LOCAL_STORAGE_KEYS } from './vars.global';

class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._endpoints = {
      movies: '/movies',
      signup: '/signup',
      signin: '/signin',
      users: '/users/me',
    };
  }

  _getHeaders() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)}`,
    };
  }

  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options)
      .then((res) => {
        if (res.ok) return res.json();
        return res
          .text()
          .then((text) => {
            throw JSON.parse(text).message || JSON.parse(text).error;
          });
      });
  }

  getMovies() {
    return this._request(this._endpoints.movies, {
      headers: this._getHeaders()
    });
  }

  saveMovie({ ...movie }) {
    return this._request(this._endpoints.movies, {
      headers: this._getHeaders(),
      method: 'POST',
      body: JSON.stringify({ ...movie }),
    });
  }

  deleteMovie(movieId) {
    return this._request( `${this._endpoints.movies}/${movieId}`, {
      headers: this._getHeaders(),
      method: 'DELETE',
    });
  }

  signup({ name, email, password }) {
    return this._request(this._endpoints.signup, {
      headers: this._getHeaders(),
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  signin({ email, password }) {
    return this._request(this._endpoints.signin, {
      headers: this._getHeaders(),
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  setUserData({ name, email }) {
    return this._request(this._endpoints.users, {
      headers: this._getHeaders(),
      method: 'PATCH',
      body: JSON.stringify({ name, email }),
    });
  }

  getUserData() {
    return this._request(this._endpoints.users, {
      headers: this._getHeaders(),
    });
  }
}

export const MAIN_API = new MainApi(API.MAIN_API_URL);
