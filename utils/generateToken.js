const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Generate a JWT token
 * @param {string} id User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpire
  });
};

module.exports = generateToken;