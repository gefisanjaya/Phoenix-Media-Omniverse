const mongoose = require('mongoose');

const KlienSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  alamat: {type: String},
  deskripsi: { type: String, required: true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Klien', KlienSchema);
