const Firestore = require('../lib/posts');
const admin = require('firebase-admin');
const { config } = require('../config/config');

admin.initializeApp(
  {
    credential: admin.credential.cert(config.googleApplicationCredentials),
    databaseURL: config.url,
  },
  'postsAuth'
);

class PostService {
  constructor() {
    this.collection = 'posts';
    this.firestore = new Firestore();
  }

  async getAllPosts() {
    const posts = await this.firestore.get(this.collection);
    return posts || [];
  }

  async getPosts({ idToken }, { tags }) {
    // const uid = await admin
    //   .app('postsAuth')
    //   .auth()
    //   .verifyIdToken(idToken)
    //   .then((decodedToken) => {
    //     return decodedToken.uid;
    //   });

    const uid = idToken;
    const id = '';

    const posts = await this.firestore.get(this.collection, uid, id, tags);
    return posts || [];
  }

  async getPost({ idPost }) {
    const id = idPost;
    const uid = '';

    const post = await this.firestore.get(this.collection, uid, id);

    return post || {};
  }

  async getUserPosts({ uid }) {
    const posts = await this.firestore.get(this.collection, uid);

    return posts || [];
  }

  async createPost(post, { idToken }) {
    const uid = idToken;

    post['created'] = this.firestore.getNow();
    post['uid'] = uid;
    const id = '';

    const createdPostId = await this.firestore.create(this.collection, post);

    const user = await this.firestore.get('users', id, uid);
    const posts = user.posts;
    posts.push(createdPostId);
    user.posts = posts;
    await this.firestore.update('users', uid, user);

    return createdPostId || '';
  }

  async updatePost(post, { idPost }, { idToken }) {
    const id = idPost;
    const uid = idToken;

    const updatedPost = await this.firestore.update(this.collection, id, post);

    return updatedPost || {};
  }

  // async deletePosts({ idToken }) {
  //   const uid = idToken;

  //   await this.firestore.delete(this.collection, this.subcollection, uid);
  // }

  async deletePost({ idPost }, { idToken }) {
    const id = idPost;
    const uid = idToken;

    const user = await this.firestore.get('users', id, uid);
    const posts = user.posts;

    const index = posts.indexOf(id);
    if (index > -1) {
      posts.splice(index, 1);
    }

    user.posts = posts;
    await this.firestore.update('users', uid, user);

    await this.firestore.delete(this.collection, id);
  }

  async deleteUserPosts({ idToken }) {
    const uid = idToken;

    await this.firestore.delete(this.collection, uid);
  }
}

module.exports = PostService;
