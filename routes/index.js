const express = require('express');
const { userRoutes } = require('./usersRoutes');
const { moviesRoutes } = require('./moviesRoutes');
const { registerLoginRoutes } = require('./registerLoginRoutes');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middelwares/auth');
const {
  pageNotFoundErrorMessage,
} = require('../config/textMessage');

const routes = express.Router();

routes.use(registerLoginRoutes);
routes.use('/users', auth, userRoutes);
routes.use('/movies', auth, moviesRoutes);
routes.use((req, res, next) => {
  next(new NotFoundError(pageNotFoundErrorMessage));
});

exports.routes = routes;
