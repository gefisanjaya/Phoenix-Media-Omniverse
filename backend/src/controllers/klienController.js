const Klien = require('../models/klien');
const multer = require('multer');
const path = require('path');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Mengambil semua klien
exports.index = async (req, res) => {
  try {
    const klien = await Klien.find();
    res.json(klien);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mengambil klien berdasarkan ID
exports.get = async (req, res) => {
  try {
    const klien = await Klien.findById(req.params.id);
    if (!klien) return res.status(404).json({ message: 'Klien not found' });
    res.json(klien);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Membuat klien baru
exports.create = [
  upload.fields([{ name: 'proposal' }, { name: 'kontrak' }, { name: 'nda' }]),
  async (req, res) => {
    const { nama, email, deskripsi } = req.body;

    if (!nama || !email) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    try {
      const klien = new Klien({
        nama,
        email,
        deskripsi,
        proposal: req.files['proposal'] ? req.files['proposal'][0].filename : null,
        kontrak: req.files['kontrak'] ? req.files['kontrak'][0].filename : null,
        nda: req.files['nda'] ? req.files['nda'][0].filename : null,
      });
      await klien.save();
      res.status(201).json(klien);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
];

// Memperbarui klien berdasarkan ID
exports.update = [
  upload.fields([{ name: 'proposal' }, { name: 'kontrak' }, { name: 'nda' }]),
  async (req, res) => {
    const { nama, email, deskripsi } = req.body;

    try {
      const klien = await Klien.findById(req.params.id);
      if (!klien) return res.status(404).json({ message: 'Klien not found' });

      if (nama) klien.nama = nama;
      if (email) klien.email = email;
      if (deskripsi) klien.deskripsi = deskripsi;
      if (req.files['proposal']) klien.proposal = req.files['proposal'][0].filename;
      if (req.files['kontrak']) klien.kontrak = req.files['kontrak'][0].filename;
      if (req.files['nda']) klien.nda = req.files['nda'][0].filename;
      klien.updated_at = Date.now();
      await klien.save();
      res.json(klien);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
];

// Menghapus klien berdasarkan ID
exports.delete = async (req, res) => {
  try {
    const klien = await Klien.findById(req.params.id);
    if (!klien) return res.status(404).json({ message: 'Klien not found' });

    await klien.remove();
    res.json({ message: 'Klien deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
