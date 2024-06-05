const mongoose = require('mongoose');

const SosialMediaSchema = new mongoose.Schema({
  id_klien: { type: mongoose.Schema.Types.ObjectId, ref: 'Klien', required: true },
  platform: { type: String, required: true },
  username: { type: String, required: true },
  sosmed_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SosialMedia', SosialMediaSchema);
