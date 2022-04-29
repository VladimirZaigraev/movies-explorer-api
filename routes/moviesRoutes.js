const express = require('express');

const moviesRoutes = express.Router();

const {
  movieIdValidation,
  createMovieValidation,
} = require('../middelwares/validate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/moviesControllers');

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', createMovieValidation, createMovie);
moviesRoutes.delete('/:_id', movieIdValidation, deleteMovie);

exports.moviesRoutes = moviesRoutes;
