const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const { MONGO_DATA_BASE, PORT } = require('./config/config');
const errorHandler = require('./middelwares/errorHandler');
const { routes } = require('./routes/index');
const {
  attentionServerErrorMessage,
} = require('./config/textMessage');
const {
  requestLogger,
  errorLogger,
} = require('./middelwares/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://zaigraev.movie.nomoredomains.work',
    'https://zaigraev.movie.nomoredomains.work',
  ],
  methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Cookie'],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(attentionServerErrorMessage);
  }, 0);
});

app.use((req, res, next) => {
  // console.log(req.method, req.path);
  next();
});

app.use(requestLogger); // логгер запросов

// роуты
app.use('/', routes);

app.use(errorLogger); // логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик

// для работы в режиме разработки
// async function main() {
//   try {
//     console.log('Try to coonect to mongodb');
//     await mongoose.connect(MONGO_DATA_BASE, {
//       useNewUrlParser: true,
//     });
//   } catch (err) {
//     console.log('Error', err);
//   }

//   console.log(`Connected ${MONGO_DATA_BASE}`);

//   app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//   });
// }

// main();

mongoose.connect(MONGO_DATA_BASE, {
  useNewUrlParser: true,
  autoIndex: true,
});

app.listen(PORT);
