require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  url: process.env.URL,
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
};

module.exports = { config };
