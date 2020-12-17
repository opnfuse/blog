const admin = require('firebase-admin');
const { config } = require('../config/config');

class FirestorePosts {
  constructor() {
    admin.initializeApp(
      {
        credential: admin.credential.cert(config.googleApplicationCredentials),
        databaseURL: config.url,
      },
      'posts'
    );

    this.db = admin.app('posts').firestore();
  }

  getNow() {
    return admin.firestore.Timestamp.now();
  }

  get(collection, uid, id, query) {
    if (query != null) {
      return this.db
        .collection(collection)
        .where('tags', 'array-contains', query)
        .get()
        .then((snapshot) => {
          let data = [];
          snapshot.forEach((doc) => {
            let Data = doc.data();
            Data['id'] = doc.id;
            data.push(Data);
          });

          return data;
        });
    }

    if (id != null) {
      return this.db
        .collection(collection)
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          data.id = id;

          return data;
        });
    }

    if (uid != null) {
      return this.db
        .collection(collection)
        .where('uid', '==', uid)
        .get()
        .then((snapshot) => {
          let data = [];
          snapshot.forEach((doc) => {
            let Data = doc.data();
            Data['id'] = doc.id;
            data.push(Data);
          });

          return data;
        });
    }

    if (uid == null && id == null && query == null) {
      return this.db
        .collection(collection)
        .get()
        .then((snapshot) => {
          let data = [];
          snapshot.forEach((doc) => {
            let Data = doc.data();
            Data['id'] = doc.id;
            data.push(Data);
          });

          return data;
        });
    }
  }

  create(collection, data) {
    return this.db
      .collection(collection)
      .add(data)
      .then((snapshot) => {
        return snapshot.id;
      });
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

  delete(collection, uid, id) {
    if (uid != null) {
      return this.db
        .collection(collection)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let Id = doc.id;
            return this.db.collection(collection).doc(Id).delete();
          });
        });
    } else {
      return this.db.collection(collection).doc(id).delete();
    }
  }
  // getSubcollection(collection, subcollection, id, query) {
  //   if (query != null) {
  //     return this.db
  //       .collection(collection)
  //       .doc(id)
  //       .collection(subcollection)
  //       .where('tags', 'array-contains', query)
  //       .get()
  //       .then((snapshot) => {
  //         let data = [];
  //         snapshot.forEach((doc) => {
  //           let Data = doc.data();
  //           Data['id'] = doc.id;
  //           data.push(Data);
  //         });

  //         return data;
  //       });
  //   } else {
  //     return this.db
  //       .collection(collection)
  //       .doc(id)
  //       .collection(subcollection)
  //       .get()
  //       .then((snapshot) => {
  //         let data = [];
  //         snapshot.forEach((doc) => {
  //           let Data = doc.data();
  //           Data['id'] = doc.id;
  //           data.push(Data);
  //         });

  //         return data;
  //       });
  //   }
  // }

  // getSubcollectionDocument(collection, subcollection, id, docId) {
  //   return this.db
  //     .collection(collection)
  //     .doc(id)
  //     .collection(subcollection)
  //     .doc(docId)
  //     .get()
  //     .then((doc) => {
  //       let data = doc.data();
  //       data['id'] = doc.id;

  //       return data;
  //     });
  // }

  // createSubcollection(collection, subcollection, id, data) {
  //   return this.db
  //     .collection(collection)
  //     .doc(id)
  //     .collection(subcollection)
  //     .add(data)
  //     .then((doc) => {
  //       return doc.id;
  //     });
  // }

  // updateSubcollectionDocument(collection, subcollection, id, docId, data) {
  //   return this.db
  //     .collection(collection)
  //     .doc(id)
  //     .collection(subcollection)
  //     .doc(docId)
  //     .update(data)
  //     .then(() => {
  //       return this.getSubcollectionDocument(
  //         collection,
  //         subcollection,
  //         id,
  //         docId
  //       );
  //     });
  // }

  // deleteSubcollection(collection, subcollection, id) {
  //   return this.db
  //     .collection(collection)
  //     .doc(id)
  //     .collection(subcollection)
  //     .listDocuments()
  //     .then((documents) => {
  //       documents.forEach((doc) => {
  //         doc.delete();
  //       });
  //     });
  // }

  // deleteSubcollectionDocument(collection, subcollection, id, docId) {
  //   return this.db
  //     .collection(collection)
  //     .doc(id)
  //     .collection(subcollection)
  //     .doc(docId)
  //     .delete();
  // }
}

module.exports = FirestorePosts;
