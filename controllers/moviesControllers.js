const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({});

    res.send(movie);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });

    res.send(movie);
  } catch (err) {
    // console.log(err);
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при добавлении фильма'));
    } else {
      next(err);
    }
  }
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .orFail(() => {
      throw new NotFoundError(`Фильм с указанным _id: ${_id} не найден`);
    })
    .then((movie) => {
      if (String(req.user._id) === String(movie.owner)) {
        Movie.findByIdAndRemove(movie._id)
          .then(() => {
            res.send({ message: 'Фильм удален успешно!' });
          });
      } else {
        throw new ForbiddenError('Нет прав на удаление фильма');
      }
    })
    .catch((err) => {
      // console.log(err)
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы неккоретные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
