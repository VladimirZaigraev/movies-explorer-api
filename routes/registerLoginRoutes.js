const express = require('express');

const registerLoginRoutes = express.Router();

const {
  createUser,
  loginUser,
} = require('../controllers/registerLoginControllers');

const {
  createUserValidation,
  loginValidation,
} = require('../middelwares/validate');

registerLoginRoutes.post('/signup', createUserValidation, createUser);
registerLoginRoutes.post('/signin', loginValidation, loginUser);

exports.registerLoginRoutes = registerLoginRoutes;
