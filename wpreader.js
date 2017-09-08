
import axios from 'axios';
import WPAuth from './wpauthentication';

// - VARIABILI GLOBALI
var defaultArgument = {
    'context': 'view',
    'page': 1,
    'per_page': 10,
    'order': 'asc'
};

/**
 *
 * @class WPReader
 */
export default class WPReader {
    constructor (options = {}) {
        this.settings = Object.assign({}, { endpoint: 'http://prova-wp/' }, options);
        this.settings.completeEndpoint = this.settings.endpoint +
            (!(this.settings.endpoint.endsWith('/')) ? '/' : '') + 'wp-json/wp/v2/';

        if (this.settings.auth) {
            this.auth = new WPAuth(this.settings);

            if (this.auth.loggedin) {
                axios.defaults.headers.common.Authorization = this.auth.token;
            }
        }

    }

    async posts (args = {}) {

        let method = 'posts';

        const def = Object.assign({}, defaultArgument, { status: 'publish' });

        if (typeof def.id !== 'undefined') {
            method += '/' + def.id;
        }

        return this._doRequest(method, args, def);
    }

    async categories (args = {}) {
        let method = 'categories';

        const def = Object.assign({}, defaultArgument, { 'orderby': 'name' });

        return this._doRequest(method, args, def);
    }

    async tags (args = {}) {
        let method = 'tags';

        const def = Object.assign({}, defaultArgument, { orderby: 'name' });

        return this._doRequest(method, args, def);
    }

    async pages (args = {}) {
        let method = 'pages';

        const def = Object.assign({}, defaultArgument, {
            orderby: 'title',
            status: 'publish'
        });

        return this._doRequest(method, args, def);
    }

    async taxonomies (args = {}) {
        let method = 'taxonomies';

        const def = Object.assign({}, defaultArgument, { context: 'view' });

        return this._doRequest(method, args, def);
    }

    async media (args = {}) {
        let method = 'media';

        const def = Object.assign({}, defaultArgument);

        return this._doRequest(method, args, def);
    }

    async users (args = {}) {
        let method = 'users';

        const def = Object.assign({}, defaultArgument, {
            'orderby': 'id'
        });

        return this._doRequest(method, args, def);
    }

    async postTypes (args = {}) {
        let method = 'types';

        return this._doRequest(method, args, {'context': 'view'});
    }

    doAuth (username = '', password = '', callback = null) {
        this.auth.doAuth(username, password, callback);
    }

    addCustomMethod (funName = 'custom', method = '') {
        let proto = Object.getPrototypeOf(this);
        proto[funName] = async args => {
            return this._doRequest(method, args, defaultArgument);
        };

        Object.setPrototypeOf(this, proto);
    }

    _queryParams (params) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }

    _doRequest (method, args, def) {

        let params = Object.assign({}, def, args);

        if (typeof args.id !== 'undefined') {
            method += '/' + args.id;
        }

        if (this.settings.debug) {
            console.log(`${this.settings.completeEndpoint}${method}/?${this._queryParams(params)}`, this.auth);
        }
        if (!this.settings.auth) {
            return axios.get(`${this.settings.completeEndpoint}${method}/?${this._queryParams(params)}`);
        }


        if (this.auth.loggedin) {
            return axios.get(`${this.settings.completeEndpoint}${method}/?${this._queryParams(params)}`, {
                headers: {
                    Authorization: `Token ${this.auth.token}`
                }
            });
        } else {
            throw new WPAuth.AuthException('La chiamata necessita di autenticazione, non sei autenticato');
        }
    }
}

module.exports = WPReader;
