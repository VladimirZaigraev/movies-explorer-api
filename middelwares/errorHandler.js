const {
  serverErrorMessage,
} = require('../config/textMessage');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // console.log(err.stack || err);
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? serverErrorMessage
        : message,
    });
  next();
};

module.exports = errorHandler;
