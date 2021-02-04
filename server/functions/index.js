const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { config } = require('./config/config');

const express = require('express');
const app = express();
const serviceAccount = require('./blog-a3313-firebase-adminsdk-903l1-6786f0a78c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  url: config.url,
});

const cors = require('cors');

const blogApi = require('./routes/blog');
const postApi = require('./routes/posts');

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middlewares/errorHandlers');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

app.use(express.json());
app.use(cors());

// Routes
postApi(app);
blogApi(app);

// Catch 404
app.use(notFoundHandler);

// Error Handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

exports.app = functions.https.onRequest(app);
