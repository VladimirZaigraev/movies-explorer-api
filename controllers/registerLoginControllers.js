const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_ROUND, JWT_SECRET } = require('../config/config');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const {
  emailConflictErrorMessage,
  userCreateErrorMessage,
} = require('../config/textMessage');

// создание пользователя
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, SALT_ROUND)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((user) => {
          res.send({
            name: user.name,
            email: user.email,
            _id: user._id,
          });
        })
        .catch((err) => {
          // console.log(err);
          if (err.name === 'ValidationError') {
            next(new ValidationError(userCreateErrorMessage));
          } else if (err.name === 'MongoServerError' && err.code === 11000) {
            next(new ConflictError(emailConflictErrorMessage));
          } else {
            next(err);
          }
        });
    });
};

// логирование
const loginUser = (req, res, next) => {
  // получаем данные
  const { email, password } = req.body;
  // ищем пользователя в базе по email
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  loginUser,
};
