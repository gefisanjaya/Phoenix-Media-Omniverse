const mongoose = require('mongoose');

const KlienSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  deskripsi: { type: String, required: true},
  proposal: { type: String },
  kontrak: { type: String },
  nda: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Klien', KlienSchema);
