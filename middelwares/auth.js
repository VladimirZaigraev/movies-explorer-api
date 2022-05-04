// middlewares/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  authErrorMessage,
  notValidTokenErrorMessage,
} = require('../config/textErrorMessage');

module.exports = (req, res, next) => {
  // console.log(req.headers);
  // достаём авторизационный заголовок
  const token = req.headers.authorization;
  // console.log('auth token', token);
  if (!token) {
    next(new UnauthorizedError(authErrorMessage));
  }

  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(notValidTokenErrorMessage));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
