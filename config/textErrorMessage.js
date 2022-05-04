// const OK_STATUS = 200;
const pageNotFoundErrorMessage = 'Страницы не существует';
const movieCreateErrorMessage = 'Переданы некорректные данные при добавлении фильма';
const movieOwnerErrorMessage = 'Нет прав на удаление фильма';
const movieIdErrorMessage = 'Фильм с указанным _id не найден';
const movieNotValidDataErrorMessage = 'Переданы некорректные данные при создании профиля';
const authErrorMessage = 'Ошибка авторизации - необходимо зарегестрироваться';
const authNotValidMailLoginErrorMessage = 'Ошибка авторизации: неправильная почта или логин';
const notValidTokenErrorMessage = 'Необходима авторизация - не получилось верифицировать токен';
const attentionServerErrorMessage = 'Сервер сейчас упадёт';
const mailErrorMessage = 'Проверьте логин и пароль';
const urlErrorMessage = 'Неправильный формат ссылки';
const emailConflictErrorMessage = 'Email зарегестрирован за другим пользователем';
const serverErrorMessage = 'На сервере произошла ошибка';
const userUpdateErrorMessage = 'Переданы некорректные данные при обновлении профиля';
const userCreateErrorMessage = 'Переданы некорректные данные при создании профиля';
const userIdNotFoundErrorMessage = 'Пользователь по указанному _id не найден';

module.exports = {
  // OK_STATUS,
  pageNotFoundErrorMessage,
  movieNotValidDataErrorMessage,
  movieCreateErrorMessage,
  movieOwnerErrorMessage,
  movieIdErrorMessage,
  authErrorMessage,
  authNotValidMailLoginErrorMessage,
  mailErrorMessage,
  urlErrorMessage,
  notValidTokenErrorMessage,
  emailConflictErrorMessage,
  serverErrorMessage,
  attentionServerErrorMessage,
  userUpdateErrorMessage,
  userIdNotFoundErrorMessage,
  userCreateErrorMessage,
};
