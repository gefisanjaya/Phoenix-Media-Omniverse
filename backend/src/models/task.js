const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assign: { type: String, enum: ['admin', 'content_planner', 'designer', 'videographer'], required: true },
  deskripsi: { type: String, required: true },
  status: { type: String, default: 'available', enum: ['available', 'in_progress', 'in_review', 'done'] },
  tenggat_waktu: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);
