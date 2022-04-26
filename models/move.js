const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  contry: {
    type: String,
    required: [true, 'Поле "coutnry" должно быть заполнено'],
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
    minlength: 2,
    maxlength: 30,
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
    minlength: 4,
    maxlength: 8,
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
    minlength: 1,
    maxlength: 30,
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (v) => isURL(v),
      message: () => 'Некорректная ссылка постера',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailer" должно быть заполнено'],
    validate: {
      validator: (v) => isURL(v),
      message: () => 'Некорректная ссылка трейлера',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => isURL(v),
      message: () => 'Некорректная ссылка мини постера',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "owner" должно быть заполнено'],
    ref: 'user',
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRu" должно быть заполнено'],
    minlength: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
    minlength: 2,
    maxlength: 30,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
