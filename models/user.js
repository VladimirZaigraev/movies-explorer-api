const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  authNotValidMailLoginErrorMessage,
  mailErrorMessage,
} = require('../config/textMessage');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле "email" должно быть заполнено'],
    validate: {
      validator: (v) => isEmail(v),
      message: mailErrorMessage,
    },
  },
  password: {
    type: String,
    unique: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function serchUser(email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // не нашёлся — отклоняем промис
        return Promise.reject(new UnauthorizedError(authNotValidMailLoginErrorMessage));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(authNotValidMailLoginErrorMessage));
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema);
