import axios from 'axios';
import WPReader from './wpreader';

/**
 *
 */
export default class ACFReader extends WPReader {
  /**
   *
   * @param {Object} options
   */
  constructor (options = {}) {
    super(options);
    this.settings.completeEndpoint = this.settings.endpoint +
      (!(this.settings.endpoint.endsWith('/')) ? '/' : '') + 'wp-json/acf/v3/';
  }

  /**
   *
   */
  tags () {
    throw 'ACF for tags is not supported yet';
  }

  /**
   *
   */
  taxonomies () {
    throw 'ACF for taxonomies is not supported yet';
  }

  /**
   *
   */
  postTypes () {
    throw 'ACF for post types is not supported yet';
  }

  async options (args = {}) {
    let method = 'options';

    return this._doRequest(method, args, {});
  }

  /**
   *
   * @param {*} method
   * @param {*} args
   * @param {*} def
   */
  _doRequest (method, args, def) {

    if (typeof args.id !== 'undefined') {
      method += '/' + args.id;
      delete args.id;
    }
    if (typeof args.fielName !== 'undefined') {
      method += '/' + args.fielName;
      delete args.fielName;
    }

    let params = Object.assign({}, def, args);
    if (this.settings.debug) {
      console.log(`${this.settings.completeEndpoint}${method}/?${this._queryParams(params)}`, this.auth);
    }
    if (!this.settings.auth) {
      return axios.get(`${this.settings.completeEndpoint}${method}/?${this._queryParams(params)}`);
    }


    if (this.auth.loggedin) {
      return axios.get(`${this.settings.completeEndpoint}${method}/?${this._queryParams(params)}`, {
        headers: {
          Authorization: `Token ${this.auth.token}`,
        }
      });
    } else {
      throw new WPAuth.AuthException('La chiamata necessita di autenticazione, non sei autenticato');
    }
  }
}
