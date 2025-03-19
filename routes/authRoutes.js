const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  updateUser,
  updatePassword
} = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/me', protect, getMe);
router.get('/logout', protect, logoutUser);
router.put('/profile', protect, updateUser);
router.put('/password', protect, updatePassword);

module.exports = router;