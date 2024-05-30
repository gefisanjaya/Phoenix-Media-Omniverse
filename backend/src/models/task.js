const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id_role: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deskripsi: { type: String, required: true },
  status: { type: String, default: 'available', enum: ['available', 'in_progress', 'done'] },
  tenggat_waktu: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);
