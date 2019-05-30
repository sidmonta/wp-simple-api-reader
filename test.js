/* eslint-env node, mocha */
const should = require('should');
const { WPReader, ACFReader } = require('./dist/wp-simple-api-reader');

describe('WP base API', () => {

  const wpapi = new WPReader({
    'endpoint': 'http://localhost/headlessWP/',
    'debug': false
  });

  describe('posts', () => {

    it('call response 200', async() => {
      let result = await wpapi.posts();
      result.status.should.be.exactly(200);

    });

    it('check # of posts', async() => {
      let result = await wpapi.posts();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single post by id', async() => {
      let result = await wpapi.posts({
        'id': 1
      });

      result.data.id.should.be.exactly(1);

    });

    it('post have keys', async() => {
      let result = await wpapi.posts({
        'id': 1
      });

      Object.keys(result.data).should.containDeep(['date', 'date_gmt', 'guid', 'id', 'link',
        'modified', 'modified_gmt', 'slug', 'status', 'type', 'title', 'content', 'author', 'excerpt',
        'featured_media', 'comment_status', 'ping_status', 'format', 'meta', 'sticky', 'template', 'categories', 'tags'
      ]);
    });

  });

  describe('categories', () => {
    it('call response 200', async() => {
      let result = await wpapi.categories();
      result.status.should.be.exactly(200);

    });

    it('check # of categories', async() => {
      let result = await wpapi.categories();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single category by id', async() => {
      let result = await wpapi.categories({
        'id': 1
      });

      result.data.id.should.be.exactly(1);

    });

    it('category have keys', async() => {
      let result = await wpapi.categories({
        'id': 1
      });

      Object.keys(result.data).should.containDeep([
        'id', 'count', 'description', 'link',
        'name', 'slug', 'taxonomy', 'parent'
      ]);
    });

  });

  describe('tags', () => {
    it('call response 200', async() => {
      let result = await wpapi.tags();
      result.status.should.be.exactly(200);

    });

    it('check # of tags', async() => {
      let result = await wpapi.tags();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single tag by id', async() => {
      let result = await wpapi.tags({
        'id': 7
      });

      result.data.id.should.be.exactly(7);

    });

    it('tag have keys', async() => {
      let result = await wpapi.tags({
        'id': 7
      });

      Object.keys(result.data).should.containDeep([
        'id', 'count', 'description', 'link', 'name', 'slug', 'taxonomy', 'meta'
      ]);
    });
  });

  describe('pages', () => {
    it('call response 200', async() => {
      let result = await wpapi.pages();
      result.status.should.be.exactly(200);

    });

    it('check # of pages', async() => {
      let result = await wpapi.pages();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single page by id', async() => {
      let result = await wpapi.pages({
        'id': 2
      });

      result.data.id.should.be.exactly(2);

    });

    it('page have keys', async() => {
      let result = await wpapi.pages({
        'id': 2
      });

      Object.keys(result.data).should.containDeep(['date', 'date_gmt', 'guid', 'id', 'link', 'modified',
        'modified_gmt', 'slug', 'status', 'type', 'parent', 'title', 'content', 'author', 'excerpt',
        'featured_media', 'comment_status', 'ping_status', 'menu_order', 'meta', 'template'
      ]);
    });
  });

  describe('taxonomies', () => {
    it('call response 200', async() => {
      let result = await wpapi.taxonomies();
      result.status.should.be.exactly(200);

    });

    it('check # of taxonomies', async() => {
      let result = await wpapi.taxonomies();

      Object.keys(result.data).length.should.be.aboveOrEqual(1);
    });

    it('return single taxonomie by slug', async() => {
      let result = await wpapi.taxonomies({
        'id': 'post_tag'
      });

      result.data.slug.should.be.exactly('post_tag');

    });

    it('taxonomie have keys', async() => {
      let result = await wpapi.taxonomies({
        'id': 'post_tag'
      });

      Object.keys(result.data).should.containDeep(['description', 'hierarchical', 'name',
        'slug', 'types', 'rest_base'
      ]);
    });
  });

  describe('media', () => {
    it('call response 200', async() => {
      let result = await wpapi.media();
      result.status.should.be.exactly(200);

    });

    it('check # of media', async() => {
      let result = await wpapi.media();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single media by id', async() => {
      let result = await wpapi.media({
        'id': 6
      });

      result.data.id.should.be.exactly(6);

    });

    it('media have keys', async() => {
      let result = await wpapi.media({
        'id': 6
      });

      Object.keys(result.data).should.containDeep([
        'date', 'date_gmt', 'guid', 'id', 'link',
        'modified', 'modified_gmt', 'slug', 'status', 'type', 'title', 'author',
        'comment_status', 'ping_status', 'meta', 'alt_text', 'caption', 'description',
        'media_type', 'mime_type', 'media_details', 'post', 'source_url'
      ]);
    });
  });

  describe('users', () => {
    it('call response 200', async() => {
      let result = await wpapi.users();
      result.status.should.be.exactly(200);

    });

    it('check # of users', async() => {
      let result = await wpapi.users();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single user by id', async() => {
      let result = await wpapi.users({
        'id': 1
      });

      result.data.id.should.be.exactly(1);

    });

    it('user have keys', async() => {
      let result = await wpapi.users({
        'id': 1
      });

      Object.keys(result.data).should.containDeep([
        'id', 'name', 'url', 'description', 'link', 'slug',
        'avatar_urls', 'meta'
      ]);
    });
  });

  describe('postTypes', () => {
    it('call response 200', async() => {
      let result = await wpapi.postTypes();
      result.status.should.be.exactly(200);

    });

    it('check # of postTypes', async() => {
      let result = await wpapi.postTypes();

      Object.keys(result.data).length.should.be.aboveOrEqual(1);
    });

    it('return single postType by slug', async() => {
      let result = await wpapi.postTypes({
        'id': 'post'
      });

      result.data.slug.should.be.exactly('post');

    });

    it('postType have keys', async() => {
      let result = await wpapi.postTypes({
        'id': 'post'
      });

      Object.keys(result.data).should.containDeep([
        'description', 'hierarchical', 'name', 'slug'
      ]);
    });
  });

});

// describe('WP Auth API', () => {
//   const wpapi = new WPReader({
//     'endpoint': 'http://localhost/headlessWP/',
//     'auth': true,
//     'debug': false
//   });

//   const username = 'luca';
//   const password = 'luca';

//   describe('set token', () => {
//     it('#doAuth', () => {
//       wpapi.doAuth(username, password);

//       wpapi.auth.loggedin.should.be.ok();
//     });
//   });

// });

describe('WP ACF API', () => {
  const wpapi = new ACFReader({
    'endpoint': 'http://localhost/headlessWP/',
    'debug': false
  });

  describe('posts', () => {

    it('call response 200', async() => {
      let result = await wpapi.posts();
      result.status.should.be.exactly(200);

    });

    it('check # of posts', async() => {
      let result = await wpapi.posts();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single post by id', async() => {
      let result = await wpapi.posts({
        'id': 1
      });

      should.exist(result.data.acf);

    });

    it('post have keys', async() => {
      let fieldName = 'acf_post';
      let result = await wpapi.posts({
        'id': 1,
        'fieldName': fieldName
      });

      result.data.should.have.propertyByPath('acf', fieldName);
    });

  });

  describe('categories', () => {
    it('call response 200', async() => {
      let result = await wpapi.categories();
      result.status.should.be.exactly(200);

    });

    it('check # of categories', async() => {
      let result = await wpapi.categories();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single category by id', async() => {
      let result = await wpapi.categories({
        'id': 1
      });

      should.exist(result.data.acf);

    });

    it('category have keys', async() => {
      let fieldName = 'category_test';
      let result = await wpapi.categories({
        'id': 1,
        'fieldName': fieldName
      });

      result.data.should.have.propertyByPath('acf', fieldName);
    });

  });

  describe('tags', () => {
    it('ACF Exception', () => {
      should['throws'](wpapi.tags, /not supported/);
    });
  });

  describe('pages', () => {
    it('call response 200', async() => {
      let result = await wpapi.pages();
      result.status.should.be.exactly(200);

    });

    it('check # of pages', async() => {
      let result = await wpapi.pages();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single page by id', async() => {
      let result = await wpapi.pages({
        'id': 2
      });

      should.exist(result.data.acf);

    });

    it('page have keys', async() => {
      let fieldName = 'page_test';
      let result = await wpapi.pages({
        'id': 2,
        'fieldName': fieldName
      });

      result.data.should.have.propertyByPath('acf', fieldName);
    });
  });

  describe('taxonomies', () => {
    it('ACF Exception', () => {
      should['throws'](wpapi.taxonomies, /not supported/);
    });
  });

  describe('media', () => {
    it('call response 200', async() => {
      let result = await wpapi.media();
      result.status.should.be.exactly(200);

    });

    it('check # of media', async() => {
      let result = await wpapi.media();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single media by id', async() => {
      let result = await wpapi.media({
        'id': 6
      });

      should.exist(result.data.acf);

    });

    it('media have keys', async() => {
      let fieldName = 'media_test';
      let result = await wpapi.media({
        'id': 6,
        'fieldName': fieldName
      });

      result.data.should.have.propertyByPath('acf', fieldName);
    });
  });

  describe('users', () => {
    it('call response 200', async() => {
      let result = await wpapi.users();
      result.status.should.be.exactly(200);

    });

    it('check # of users', async() => {
      let result = await wpapi.users();

      result.data.length.should.be.aboveOrEqual(1);
    });

    it('return single user by id', async() => {
      let result = await wpapi.users({
        'id': 1
      });

      should.exist(result.data.acf);

    });

    it('user have keys', async() => {
      let fieldName = 'user_test';
      let result = await wpapi.users({
        'id': 1,
        'fieldName': fieldName
      });

      result.data.should.have.propertyByPath('acf', fieldName);
    });
  });

  describe('postTypes', () => {
    it('ACF Exception', () => {
      should['throws'](wpapi.postTypes, /not supported/);
    });
  });
});
