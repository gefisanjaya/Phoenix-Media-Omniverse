const mongoose = require('mongoose');

const SosialMediaSchema = new mongoose.Schema({
  id_klien: { type: mongoose.Schema.Types.ObjectId, ref: 'Klien', required: true },
  platform: { type: String, required: true },
  username: { type: String, required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String },
  token_expires_at: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SosialMedia', SosialMediaSchema);
