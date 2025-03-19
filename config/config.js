const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  jwtCookieExpire: parseInt(process.env.JWT_COOKIE_EXPIRE, 10) || 30
};