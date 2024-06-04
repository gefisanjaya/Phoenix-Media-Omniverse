const mongoose = require('mongoose');

const KontenSchema = new mongoose.Schema({
  sosmed_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SosialMedia', required: true },
  jadwal: { type: Date, required: true },
  judul: { type: String, required: true },
  status_upload: { type: String, default: 'not_uploaded', enum: ['not_uploaded', 'uploaded'] },
  format_konten: { type: String, required: true },
  caption: { type: String },
  copy: { type: String },
  link_output: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Konten', KontenSchema);
