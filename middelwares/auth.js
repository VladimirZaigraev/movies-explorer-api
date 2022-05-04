// middlewares/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // console.log(req.headers);
  // достаём авторизационный заголовок
  const token = req.headers.authorization;
  // console.log('auth token', token);
  if (!token) {
    next(new UnauthorizedError('Ошибка авторизации - необходимо зарегестрироваться'));
  }

  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация - не получилось верифицировать токен'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
