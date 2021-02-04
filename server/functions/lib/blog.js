const admin = require('firebase-admin');
const { config } = require('../config/config');
const serviceAccount = require('../blog-a3313-firebase-adminsdk-903l1-6786f0a78c.json');

class FirestoreBlog {
  constructor() {
    admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: config.url,
      },
      'blog'
    );

    this.db = admin.app('blog').firestore();
  }

  get(collection, id) {
    return this.db
      .collection(collection)
      .doc(id)
      .get()
      .then((doc) => {
        let data = doc.data();

        return data;
      });
  }

  create(collection, id, data) {
    return this.db.collection(collection).doc(id).set(data);
  }

  update(collection, id, data) {
    return this.db
      .collection(collection)
      .doc(id)
      .update(data)
      .then(() => {
        return this.get(collection, id);
      });
  }

  delete(collection, id) {
    return this.db
      .collection(collection)
      .doc(id)
      .listCollections()
      .then((collections) => {
        collections.forEach((collection) => {
          collection.listDocuments().then((documents) => {
            documents.forEach((document) => {
              document.delete();
            });
          });
        });
      })
      .then(() => {
        this.db.collection(collection).doc(id).delete();
      })
      .catch(() => {
        this.db.collection(collection).doc(id).delete();
      });
  }
}

module.exports = FirestoreBlog;
