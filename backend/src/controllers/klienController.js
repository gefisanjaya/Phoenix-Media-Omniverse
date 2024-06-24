const Klien = require('../models/klien');

// Get all clients
exports.getAllKlien = async (req, res) => {
  try {
    const clients = await Klien.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single client by ID
exports.getKlienById = async (req, res) => {
  try {
    const client = await Klien.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new client
exports.createKlien = async (req, res) => {
  const { nama, email, alamat, deskripsi } = req.body;

  if (!nama || !email || !deskripsi) {
    return res.status(400).json({ message: 'Nama, email, dan deskripsi harus diisi.' });
  }

  const existingClient = await Klien.findOne({ email });
  if (existingClient) {
    return res.status(400).json({ message: 'Email sudah digunakan.' });
  }

  const client = new Klien({
    nama,
    email,
    alamat,
    deskripsi
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a client by ID
exports.updateKlien = async (req, res) => {
  try {
    const client = await Klien.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const { nama, email, alamat, deskripsi } = req.body;

    if (!nama || !email || !deskripsi) {
      return res.status(400).json({ message: 'Nama, email, dan deskripsi harus diisi.' });
    }

    const existingClient = await Klien.findOne({ email });
    if (existingClient && existingClient._id.toString() !== req.params.id) {
      return res.status(400).json({ message: 'Email sudah digunakan oleh klien lain.' });
    }
    
    if (nama) client.nama = nama;
    if (email) client.email = email;
    if (alamat) client.alamat = alamat;
    if (deskripsi) client.deskripsi = deskripsi;
    client.updated_at = Date.now();

    const updatedClient = await client.save();
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a client by ID
exports.deleteKlien = async (req, res) => {
  try {
    const client = await Klien.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
