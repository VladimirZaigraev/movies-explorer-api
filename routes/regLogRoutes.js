const express = require('express');

const regLogRoutes = express.Router();

const {
  createUser,
  loginUser,
} = require('../controllers/regLogControllers');

const {
  createUserValidation,
  loginValidation,
} = require('../middelwares/validate');

regLogRoutes.post('/signup', createUserValidation, createUser);
regLogRoutes.post('/signin', loginValidation, loginUser);

exports.regLogRoutes = regLogRoutes;
