import { API } from './config';

class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}`, options)
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
    return this._request('', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}

export const MOVIES_API = new MoviesApi(API.MOVIES_API_URL);
