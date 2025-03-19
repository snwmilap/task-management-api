const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Create new task
 * @route POST /api/tasks
 * @access Private
 */
exports.createTask = asyncHandler(async (req, res) => {
  // Add user to request body
  req.body.user = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
});

/**
 * Get all user tasks with pagination and filtering
 * @route GET /api/tasks
 * @access Private
 */
exports.getTasks = asyncHandler(async (req, res) => {
  // Build query
  const queryObj = { user: req.user.id };
  
  // Filter by completion status if provided
  if (req.query.completed) {
    queryObj.completed = req.query.completed === 'true';
  }
  
  // Filter by priority if provided
  if (req.query.priority) {
    queryObj.priority = req.query.priority;
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Task.countDocuments(queryObj);

  // Execute query
  const tasks = await Task.find(queryObj)
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit);

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: tasks.length,
    pagination,
    data: tasks
  });
});

/**
 * Get single task
 * @route GET /api/tasks/:id
 * @access Private
 */
exports.getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  // Make sure user owns the task
  if (task.user.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to access this task'
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

/**
 * Update task
 * @route PUT /api/tasks/:id
 * @access Private
 */
exports.updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  // Make sure user owns the task
  if (task.user.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to update this task'
    });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: task
  });
});

/**
 * Delete task
 * @route DELETE /api/tasks/:id
 * @access Private
 */
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  // Make sure user owns the task
  if (task.user.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to delete this task'
    });
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * Get task statistics
 * @route GET /api/tasks/stats
 * @access Private
 */
exports.getTaskStats = asyncHandler(async (req, res) => {
  const stats = await Task.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: '$completed',
        count: { $sum: 1 },
        tasks: { $push: { title: '$title', priority: '$priority' } }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Get priority stats
  const priorityStats = await Task.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: '$priority',
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.status(200).json({
    success: true,
    data: { 
      completionStats: stats,
      priorityStats
    }
  });
});