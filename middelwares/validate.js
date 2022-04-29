const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validationUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Невалидный URL!');
};

const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required().min(8).message({
      'string.min': 'Минимальная длина поля "password" - 8',
    }),
  }),
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required().min(8).message({
      'string.min': 'Минимальная длина поля "password" - 8',
    }),
  }),
});

const updateUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
  }),
});

const getUserByIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      })
      .message({
        'string.length': 'Длина поля - 24',
      }),
  }),
});

const createMovieValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationUrl),
    trailerLink: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.number(),
  }).unknown(true),
});

module.exports = {
  createUserValidation,
  updateUserValidation,
  loginValidation,
  getUserByIdValidation,
  movieIdValidation,
  createMovieValidation,
};
