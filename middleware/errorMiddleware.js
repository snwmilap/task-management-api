const config = require('../config/config');

/**
 * Error response handler
 * @param {Error} err Error object
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware
 * @returns {Object} Error response
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(`❌ Error: ${err}`);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new Error(message);
    error.statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new Error(message);
    error.statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new Error(message);
    error.statusCode = 400;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again.';
    error = new Error(message);
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Your token has expired. Please log in again.';
    error = new Error(message);
    error.statusCode = 401;
  }

  const statusCode = error.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    error: error.message || 'Server Error',
    stack: config.nodeEnv === 'production' ? '🥞' : err.stack
  });
};

module.exports = errorHandler;