/**
 * Async handler to avoid try-catch blocks in route handlers
 * @param {Function} fn Function that returns a Promise
 * @returns {Function} Express middleware
 */
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
  
  module.exports = asyncHandler;