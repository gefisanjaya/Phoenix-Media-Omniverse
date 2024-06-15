const SosialMedia = require('../models/mediaSosial');

// Mengambil semua akun media sosial
exports.index = async (req, res) => {
  try {
    const sosialMediaAccounts = await SosialMedia.find().populate('id_klien');
    res.json(sosialMediaAccounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mengambil akun media sosial berdasarkan ID
exports.get = async (req, res) => {
  try {
    const sosialMediaAccount = await SosialMedia.findById(req.params.id).populate('id_klien');
    if (!sosialMediaAccount) return res.status(404).json({ message: 'Social Media Account not found' });
    res.json(sosialMediaAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mengambil akun media sosial berdasarkan ID
exports.getById = async (req, res) => {
  try {
    const sosialMediaAccount = await SosialMedia.findById(req.params.id).populate('id_klien');
    if (!sosialMediaAccount) return res.status(404).json({ message: 'Social Media Account not found' });
    res.json(sosialMediaAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Membuat akun media sosial baru
exports.create = async (req, res) => {
  const { id_klien, platform, username, sosmed_id } = req.body;

  if (!id_klien || !platform || !username || !sosmed_id) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const sosialMediaAccount = new SosialMedia({
      id_klien,
      platform,
      username,
      sosmed_id
    });
    await sosialMediaAccount.save();
    res.status(201).json(sosialMediaAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Memperbarui akun media sosial berdasarkan ID
exports.update = async (req, res) => {
  const { sosmed_id} = req.body;

  try {
    const sosialMediaAccount = await SosialMedia.findById(req.params.id);
    if (!sosialMediaAccount) return res.status(404).json({ message: 'Social Media Account not found' });

    if (sosmed_id) sosialMediaAccount.sosmed_id = sosmed_id;
    sosialMediaAccount.updated_at = Date.now();
    await sosialMediaAccount.save();
    res.json(sosialMediaAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Menghapus akun media sosial berdasarkan ID
exports.delete = async (req, res) => {
  try {
    const sosialMediaAccount = await SosialMedia.findByIdAndDelete(req.params.id);
    if (!sosialMediaAccount) return res.status(404).json({ message: 'Social Media Account not found' });
    res.json({ message: 'Social Media Account deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
