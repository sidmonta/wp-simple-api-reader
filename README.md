# WPAPI
A simple javascript library for the WP-REST-API and ACF to REST API

## Installations
For install in your project do

```bash
npm install —save wprestreader
```

## Require
 - [WP REST API v2.0](https://github.com/WP-API/WP-API) (*wp version < 4.7*)
 - [ACF to REST API plugins](https://github.com/airesvsg/acf-to-rest-api)
 - [JWT Authentication for the WP REST API](https://github.com/Tmeister/wp-api-jwt-auth)

## Basic usage
```javascript
import {WPReader, ACFReader} from 'wpapi.js';

const wpapi = new WPReader({'endpoint': 'http://localhost/headlessWP/'});

(async () => {
  let result = await wpapi.posts({
    'id': 1,
    'per_page': 20,
    'offset': 5,
    'orderby': 'title'
  });

  result.data.forEach((post, index) => {
    document.querySelector(`h1.post-${index}`).text = post.title;
  });
})();

const wpacf = new ACFReader({
  'endpoint': 'http://localhost/headlessWP/',
  'auth': true,
  'debug': true
});

(async () => {

  wpacf.doAuth('username', 'password');

  let result = await wpacf.page({
    'id': 2,
    'fieldName': 'page_test'
  });

  let value = result.data.acf.page_test;
})();
```

## Classes
### WPReader
This object implements the method for the major endpoint in the WP REST API

##### Options

| Option | Desc |
|:--|:--|
| endpoint | (String) the URL at the Wordpress installations. (not wp-json/…) |
| auth | (Boolean) Extends the WP REST API using JSON Web Tokens Authentication as an authentication method. I use JWT Authentication for WP REST API |
| debug | (Boolean) Print in console all URL request  |

##### Methods
* **posts**: Implement the posts’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Post Endpoint](https://developer.wordpress.org/rest-api/reference/posts/).<br>
Set the param ```id``` for request single post with id
* **categories**: Implement the categories’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Category Endpoint](https://developer.wordpress.org/rest-api/reference/categories/).<br>
Set the param ```id``` for request single category with id
* **tags**: Implement the tags’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Tag Endpoint](https://developer.wordpress.org/rest-api/reference/tags/).<br>
Set the param ```id``` for request single tag with id
* **pages**: Implement the pages’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Page Endpoint](https://developer.wordpress.org/rest-api/reference/pages/).<br>
Set the param ```id``` for request single page with id
* **taxonomies**: Implement the taxonomies's endpoint of the WP REST API. This method is invoce the param object, for the param see [Taxonomy Endpoint](https://developer.wordpress.org/rest-api/reference/taxonomies/).<br>
Set the param ```id``` for request single taxonomy with slug
* **media**: Implement the media’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Media Endpoint](https://developer.wordpress.org/rest-api/reference/media/).<br>
Set the param ```id``` for request single media with id
* **users**: Implement the users’s endpoint of the WP REST API. This method is invoce the param object, for the param see [User Endpoint](https://developer.wordpress.org/rest-api/reference/users/).<br>
Set the param ```id``` for request single user with id
* **postTypes**: Implement the post_types’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Post Type Endpoint](https://developer.wordpress.org/rest-api/reference/post-types/).<br>
Set the param ```id``` for request single post types with slug
* **doAuth**: If options ```auth``` is set to ```true``` this method make an authentication call that save a token in the localstorage. The params of the method are ```username, password, callback``` the ```callback``` is a function called after the token is storate.
* **addCustomMethod**: Create a custom method for a custom endpoint in the Wordpress endpoint. The params are ```funName```: set a name of the function; ```method```: set a partial endpoint URL; ```baseEndpoint```: set a endpoint. Default 'wp-json/wp/v2/'


### ACFReader
This object implements the method for all major endpoint in [*ACF to REST API* plugins](https://github.com/airesvsg/acf-to-rest-api).
The request return all (or single) **ACF** for the requested page, post, user, taxonomy
##### Options

| Option | Desc |
|:--|:--|
| endpoint | (String) the URL at the Wordpress installations. (not wp-json/…) |
| auth | (Boolean) Extends the WP REST API using JSON Web Tokens Authentication as an authentication method. I use JWT Authentication for WP REST API |
| debug | (Boolean) Print in console all URL request  |

##### Methods
* **posts**: Implement the posts’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Post Endpoint](https://developer.wordpress.org/rest-api/reference/posts/).<br>
Set the param ```id``` for request single post with id.<br>
Set the param ```fieldName``` for request single ACF field with name.
* **categories**: Implement the categories’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Category Endpoint](https://developer.wordpress.org/rest-api/reference/categories/).<br>
Set the param ```id``` for request single category with id.<br>
Set the param ```fieldName``` for request single ACF field with name.
* **pages**: Implement the pages’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Page Endpoint](https://developer.wordpress.org/rest-api/reference/pages/).<br>
Set the param ```id``` for request single page with id.<br>
Set the param ```fieldName``` for request single ACF field with name.
* **media**: Implement the media’s endpoint of the WP REST API. This method is invoce the param object, for the param see [Media Endpoint](https://developer.wordpress.org/rest-api/reference/media/).<br>
Set the param ```id``` for request single media with id.<br>
Set the param ```fieldName``` for request single ACF field with name.
* **users**: Implement the users’s endpoint of the WP REST API. This method is invoce the param object, for the param see [User Endpoint](https://developer.wordpress.org/rest-api/reference/users/).<br>
Set the param ```id``` for request single user with id
Set the param ```fieldName``` for request single ACF field with name.
* **doAuth**: If options ```auth``` is set to ```true``` this method make an authentication call that save a token in the localstorage. The params of the method are ```username, password, callback``` the ```callback``` is a function called after the token is storate.
* **addCustomMethod**: Create a custom method for a custom endpoint in the Wordpress endpoint. The params are ```funName```: set a name of the function; ```method```: set a partial endpoint URL; ```baseEndpoint```: set a endpoint. Default 'wp-json/wp/v2/'

