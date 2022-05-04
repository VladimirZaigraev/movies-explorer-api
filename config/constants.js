const {
  NODE_ENV = 'development',
  JWT_SECRET = 'dev_secret',
  PORT = 3000,
} = process.env;

const MONGO_DATA_BASE = 'mongodb://localhost:27017/moviesdb';
const SALT_ROUND = 10;

module.exports = {
  MONGO_DATA_BASE,
  NODE_ENV,
  JWT_SECRET,
  PORT,
  SALT_ROUND,
};
