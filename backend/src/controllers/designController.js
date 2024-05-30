const Task = require('../models/task');

// Get all tasks available for designer
exports.index = async (req, res) => {
  try {
    const tasks = await Task.find({ status: 'available' });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get specific task
exports.get = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task status to "in_progress"
exports.update = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = 'in_progress';
    task.updated_at = Date.now();
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manage task completion
exports.manageTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = 'done';
    task.updated_at = Date.now();
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
