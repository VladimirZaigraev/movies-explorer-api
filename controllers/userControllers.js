const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const {
  userIdNotFoundErrorMessage,
  emailConflictErrorMessage,
  userUpdateErrorMessage,
} = require('../config/textMessage');

// получение данных о пользователе
const getUserMe = (req, res, next) => {
  const userId = req.user._id;
  // console.log('getUserMe', req);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userIdNotFoundErrorMessage);
      }
      res.send({ user });
    })
    .catch(next);
};

// обновление пользователя
const updateUser = async (req, res, next) => {
  try {
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
        throw new NotFoundError(userIdNotFoundErrorMessage);
      });
    // console.log(user);
    res.send(user);
  } catch (err) {
    // console.log(err);
    if (err.name === 'ValidationError') {
      next(new ValidationError(userUpdateErrorMessage));
    } else if (err.code === 11000) {
      next(new ConflictError(emailConflictErrorMessage));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUserMe,
  updateUser,
};
