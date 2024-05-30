const Task = require('../models/task');

// Get all tasks
exports.index = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get task by ID
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

// Create new task
exports.create = async (req, res) => {
  const { deskripsi, tenggat_waktu } = req.body;

  try {
    const task = new Task({
      id_role: req.user._id,
      deskripsi,
      tenggat_waktu,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task
exports.update = async (req, res) => {
  const { deskripsi, tenggat_waktu, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.deskripsi = deskripsi;
    task.tenggat_waktu = tenggat_waktu;
    task.status = status;
    task.updated_at = Date.now();

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
