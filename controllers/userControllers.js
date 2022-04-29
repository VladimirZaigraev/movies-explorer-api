const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_ROUND } = require('../config/constats');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET } = process.env;

// создание пользователя
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUND)
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
            next(new ValidationError('Переданы неккоретные данные'));
          } else if (err.name === 'MongoServerError' && err.code === 11000) {
            next(new ConflictError('Пользователь с такой почтой уже существует'));
          } else {
            next(err);
          }
        });
    });
};

// // проверка по id
// const getUserById = async (req, res, next) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId)
//       .orFail(() => {
//         throw new NotFoundError('Пользователь по указанному _id не найден.');
//       });
//     res.send(user);
//   } catch (err) {
//     // console.log(err);
//     if (err.name === 'CastError') {
//       next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
//     } else {
//       next(err);
//     }
//   }
// };

// получение данных о пользователе
const getUserMe = (req, res, next) => {
  const userId = req.user._id;
  console.log('getUserMe', req);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь c id: ${userId} не найден`);
      }

      res.send({ user });
    })
    .catch(next);
};

// обновление пользователя
const updateUser = async (req, res, next) => {
  try {
    console.log('updateUser', req.body);
    const { name, email } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      // req.body,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(() => {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      });
    console.log(user);
    res.send(user);
  } catch (err) {
    // console.log(err);
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
    } else {
      next(err);
    }
  }
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
  getUserMe,
  updateUser,
};
