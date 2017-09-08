import axios from 'axios';

export default class WPAuth {

  constructor (options = {}) {
    this.endpoint = options.endpoint || '';
    this._token = '';
    this._data = {};

    this.loggedin = this._restoreToken();
  }

  async doAuth (username = '', password = '', callback = null) {
    const method = 'wp-json/jwt-auth/v1/token';
    let url = this.endpoint + (!(this.endpoint.endsWith('/')) ? '/' : '') + method;
    console.log(url, username, password);
    try {
      let response = await axios({
        method: 'post',
        url: url,
        data: { 'username': username, 'password': password },
        withCredentials: true,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache'
        }
      });
      let data = response.data || {};
      console.log(response);
      if (data.token) {
        this._token = data.token;
        delete data.token;
      }

      this._data = data;
      console.log('Autenticazione avvenuta con successo');
      this.loggedin = true;

      this._saveToken();

      if (callback instanceof Function) {
        callback(this._token, this._data);
      }
    } catch (err) {
      console.error('Autenticazione fallita', err);
      this.loggedin = false;
    }
  }

  get token () {
    return this._token;
  }

  set token (t) {
    this._token = t;
  }

  get data () {
    return this._data;
  }

  set data (d) {
    this._data = d;
  }

  _saveToken () {
    if (window.localStorage) {
      localStorage.setItem(`wptoken${this.endpoint}`, JSON.stringify({
        token: this._token,
        data: this._data
      }));
      return true;
    }
    return false;
  }

  _restoreToken () {
    if (window.localStorage) {
      let ret = JSON.parse(localStorage.getItem(`wptoken${this.endpoint}`));
      if (ret) {
        this._token = ret.token;
        this._data = ret.data;
      }
    }
    return (this._token !== '');
  }

  static AuthException (message) {
    this.message = message;
    this.name = 'AuthException';
  }

}
