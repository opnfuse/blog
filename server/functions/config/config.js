require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  url: process.env.URL,
  googleApplicationCredentials: process.env.google_application_credentials,
};

module.exports = { config };
