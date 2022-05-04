/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const {
  serverErrorMessage,
} = require('../config/textErrorMessage');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  console.log(err.stack || err);

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? serverErrorMessage
        : message,
    });
};

module.exports = errorHandler;
