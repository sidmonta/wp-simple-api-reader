
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
 * This class implement all major endpoint in the WP REST API.
 * The request to the Wordpress endpoints is made by axios library
 * @class WPReader
 */
export default class WPReader {

    /**
     * Constructor of the class, it sets the basic options.
     * Options: {
     *  endpoint: URL of Wordpress,
     *  auth: implement JWT token,
     *  debug: print in console the endpoint
     * }
     * @param {Object} options
     */
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

    /**
     * posts endpoint 'wp-json/wp/v2/posts'
     * @param {Object} args
     */
    async posts (args = {}) {

        let method = 'posts';

        const def = Object.assign({}, defaultArgument, { status: 'publish' });

        if (typeof def.id !== 'undefined') {
            method += '/' + def.id;
        }

        return this._doRequest(method, args, def);
    }

    /**
     * categories endpoint 'wp-json/wp/v2/categories'
     * @param {Object} args
     */
    async categories (args = {}) {
        let method = 'categories';

        const def = Object.assign({}, defaultArgument, { 'orderby': 'name' });

        return this._doRequest(method, args, def);
    }

    /**
     * tags endpoint 'wp-json/wp/v2/tags'
     * @param {Object} args
     */
    async tags (args = {}) {
        let method = 'tags';

        const def = Object.assign({}, defaultArgument, { orderby: 'name' });

        return this._doRequest(method, args, def);
    }

    /**
     * pages endpoint 'wp-json/wp/v2/pages'
     * @param {Object} args
     */
    async pages (args = {}) {
        let method = 'pages';

        const def = Object.assign({}, defaultArgument, {
            orderby: 'title',
            status: 'publish'
        });

        return this._doRequest(method, args, def);
    }

    /**
     * taxonomies endpoint 'wp-json/wp/v2/taxonomies'
     * @param {Object} args
     */
    async taxonomies (args = {}) {
        let method = 'taxonomies';

        const def = Object.assign({}, defaultArgument, { context: 'view' });

        return this._doRequest(method, args, def);
    }

    /**
     * media endpoint 'wp-json/wp/v2/media'
     * @param {Object} args
     */
    async media (args = {}) {
        let method = 'media';

        const def = Object.assign({}, defaultArgument);

        return this._doRequest(method, args, def);
    }

    /**
     * users endpoint 'wp-json/wp/v2/users'
     * @param {Object} args
     */
    async users (args = {}) {
        let method = 'users';

        const def = Object.assign({}, defaultArgument, {
            'orderby': 'id'
        });

        return this._doRequest(method, args, def);
    }

    /**
     * types endpoint 'wp-json/wp/v2/types'
     * @param {Object} args
     */
    async postTypes (args = {}) {
        let method = 'types';

        return this._doRequest(method, args, {'context': 'view'});
    }

    /**
     * Make login to wordpress, this method register a token for the other request
     * @param {String} username username
     * @param {String} password password
     * @param {Function} callback function for successed login
     */
    doAuth (username = '', password = '', callback = null) {
        this.auth.doAuth(username, password, callback);
    }

    /**
     * This method implement a custom method for a custom endpoint in the WP
     * REST API.
     * @param {String} funName name of the functions
     * @param {String} method partial URL of the endpoin:
     *                        es. 'wp-json/wp/v2/${method}'
     * @param {String} baseEndpoint custom endpoint. Default 'wp-json/wp/v2/'
     */
    addCustomMethod (funName = 'custom', method = '', baseEndpoint = 'wp-json/wp/v2/') {

        let completeEndpoint = this.settings.endpoint +
        (!(this.settings.endpoint.endsWith('/')) ? '/' : '') + baseEndpoint;

        let proto = Object.getPrototypeOf(this);
        proto[funName] = async args => {
            return this._doRequest(method, args, defaultArgument, completeEndpoint);
        };

        Object.setPrototypeOf(this, proto);
    }

    /**
     *
     * @param {Object} params
     */
    _queryParams (params) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }

    /**
     *
     * @param {String} method
     * @param {Object} args
     * @param {Object} def
     */
    _doRequest (method, args, def, completeEndpoint = false) {

        if (completeEndpoint === false) {
            completeEndpoint = this.settings.completeEndpoint;
        }

        if (typeof args.id !== 'undefined') {
            method += '/' + args.id;
            delete args.id;
        }

        let params = Object.assign({}, def, args);
        if (this.settings.debug) {
            console.log(`${completeEndpoint}${method}/?${this._queryParams(params)}`, this.auth);
        }
        if (!this.settings.auth) {
            return axios.get(`${completeEndpoint}${method}/?${this._queryParams(params)}`);
        }


        if (this.auth.loggedin) {
            return axios.get(`${completeEndpoint}${method}/?${this._queryParams(params)}`, {
                headers: {
                    Authorization: `Token ${this.auth.token}`
                }
            });
        } else {
            throw new WPAuth.AuthException('La chiamata necessita di autenticazione, non sei autenticato');
        }
    }
}
