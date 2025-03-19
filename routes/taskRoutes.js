const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { taskValidation, validateObjectId } = require('../middleware/validationMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(taskValidation, createTask);

router.route('/stats')
  .get(getTaskStats);

router.route('/:id')
  .get(validateObjectId, getTask)
  .put(validateObjectId, taskValidation, updateTask)
  .delete(validateObjectId, deleteTask);

module.exports = router;