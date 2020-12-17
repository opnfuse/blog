/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
const { config } = require('../../config/config');

function withErrorStack(err, stack) {
  if (config.dev) {
    return {
      ...err,
      stack,
    };
  }
  return err;
}

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
