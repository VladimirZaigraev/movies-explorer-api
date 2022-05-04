const express = require('express');
const { userRoutes } = require('./usersRoutes');
const { moviesRoutes } = require('./moviesRoutes');
const { regLogRoutes } = require('./regLogRoutes');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middelwares/auth');

const routes = express.Router();

routes.use(regLogRoutes);
routes.use('/users', auth, userRoutes);
routes.use('/movies', auth, moviesRoutes);
routes.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

exports.routes = routes;
