const mongoose = require('mongoose');

const ScheduledContentSchema = new mongoose.Schema({
  konten_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Konten', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScheduledContent', ScheduledContentSchema);
