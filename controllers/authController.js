const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');
const config = require('../config/config');

/**
 * Register a new user
 * @route POST /api/users/register
 * @access Public
 */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      error: 'User already exists'
    });
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password
  });

  // Generate token
  const token = generateToken(user._id);

  // Set token in cookie
  const cookieOptions = {
    expires: new Date(Date.now() + config.jwtCookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  
  if (config.nodeEnv === 'production') {
    cookieOptions.secure = true;
  }
  
  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

/**
 * Login user
 * @route POST /api/users/login
 * @access Public
 */
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  // Generate token
  const token = generateToken(user._id);

  // Set token in cookie
  const cookieOptions = {
    expires: new Date(Date.now() + config.jwtCookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  
  if (config.nodeEnv === 'production') {
    cookieOptions.secure = true;
  }
  
  res.cookie('token', token, cookieOptions);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

/**
 * Get current logged in user
 * @route GET /api/users/me
 * @access Private
 */
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  });
});

/**
 * Log user out / clear cookie
 * @route GET /api/users/logout
 * @access Private
 */
exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * Update user details
 * @route PUT /api/users/profile
 * @access Private
 */
exports.updateUser = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name || req.user.name,
    email: req.body.email || req.user.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

/**
 * Update password
 * @route PUT /api/users/password
 * @access Private
 */
exports.updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Generate new token
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token
  });
});