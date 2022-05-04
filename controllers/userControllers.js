const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

// получение данных о пользователе
const getUserMe = (req, res, next) => {
  const userId = req.user._id;
  // console.log('getUserMe', req);
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
    // console.log('updateUser', req.body);
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
    // console.log(user);
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

module.exports = {
  getUserMe,
  updateUser,
};
