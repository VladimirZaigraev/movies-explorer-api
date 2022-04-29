const express = require('express');

const userRoutes = express.Router();

const {
  updateUserValidation,
} = require('../middelwares/validate');

const {
  getUserMe,
  updateUser,
} = require('../controllers/userControllers');

userRoutes.get('/me', getUserMe);
userRoutes.patch('/me', updateUserValidation, updateUser);

exports.userRoutes = userRoutes;
