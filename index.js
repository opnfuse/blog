const express = require('express');
const app = express();
const cors = require('cors');

const { config } = require('./config/config');
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

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
