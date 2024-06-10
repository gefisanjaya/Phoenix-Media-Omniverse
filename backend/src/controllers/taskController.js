const Task = require('../models/task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { deskripsi, tenggat_waktu } = req.body;
  try {
    const newTask = new Task({
      id_role: req.user._id,
      deskripsi,
      tenggat_waktu,
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task status
exports.updateTask = async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    task.updated_at = Date.now();

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    res.status(200).json({ message: 'Task removed' });
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