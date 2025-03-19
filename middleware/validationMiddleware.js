const { validationResult, body, param } = require('express-validator');
const mongoose = require('mongoose');

/**
 * Handle validation errors
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

/**
 * User registration validation rules
 */
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cannot be more than 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  validateRequest
];

/**
 * User login validation rules
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),
  
  validateRequest
];

/**
 * Task creation validation rules
 */
const taskValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot be more than 500 characters'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date'),
  
  validateRequest
];

/**
 * Validate MongoDB ObjectId
 */
const validateObjectId = [
  param('id')
    .custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ID format');
      }
      return true;
    }),
  
  validateRequest
];

module.exports = {
  registerValidation,
  loginValidation,
  taskValidation,
  validateObjectId
};