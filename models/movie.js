const { Schema, model } = require('mongoose');
const isURL = require('validator/lib/isURL');
const {
  urlErrorMessage,
} = require('../config/textMessage');

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, 'Поле "coutnry" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (v) => isURL(v),
      message: () => urlErrorMessage,
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailer" должно быть заполнено'],
    validate: {
      validator: (v) => isURL(v),
      message: () => urlErrorMessage,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => isURL(v),
      message: () => urlErrorMessage,
    },
  },
  owner: {
    type: String,
    required: [true, 'Поле "owner" должно быть заполнено'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRu" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },
});

module.exports = model('movie', movieSchema);
