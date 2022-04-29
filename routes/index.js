const express = require('express');
const { userRoutes } = require('./usersRoutes');
const { moviesRoutes } = require('./moviesRoutes');
const NotFoundError = require('../errors/NotFoundError');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/movies', moviesRoutes);
routes.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

exports.routes = routes;
