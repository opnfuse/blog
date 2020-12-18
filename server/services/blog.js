const Firestore = require('../lib/blog');
// const admin = require('firebase-admin');

class CetiService {
  constructor() {
    this.collection = 'users';
    this.firestore = new Firestore();
  }

  async getUser({ idToken }) {
    // const uid = await admin.auth().verifyIdToken(idToken).then((decodedToken) => {ç
    //   return decodedToken.uid
    // })

    const uid = idToken;
    const user = await this.firestore.get(this.collection, uid);
    return user || {};
  }

  async createUser(user, { idToken }) {
    const uid = idToken;
    const createdUserId = await this.firestore.create(
      this.collection,
      uid,
      user
    );
    return createdUserId || '';
  }

  async updateUser(user, { idToken }) {
    const uid = idToken;
    const updatedUser = await this.firestore.update(this.collection, uid, user);

    return updatedUser || {};
  }

  async deleteUser({ idToken }) {
    const uid = idToken;
    await this.firestore.delete(this.collection, uid);
  }
}

module.exports = CetiService;
