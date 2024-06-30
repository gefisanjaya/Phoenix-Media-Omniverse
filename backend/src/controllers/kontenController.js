const Konten = require('../models/konten');
const SosialMedia = require('../models/mediaSosial');

// Create a new content
exports.createKonten = async (req, res) => {
  try {
    const { sosmed_id, jadwal, judul, format_konten, caption, copy, link_output } = req.body;

    // Validate foreign keys
    const sosmedExists = await SosialMedia.findById(sosmed_id);

    if (!sosmedExists) {
      return res.status(400).json({ message: 'Klien or SosialMedia not found' });
    }

    const newKonten = new Konten({
      sosmed_id,
      jadwal,
      judul,
      format_konten,
      caption,
      copy,
      link_output
    });

    await newKonten.save();
    res.status(201).json(newKonten);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all content
exports.getAllKonten = async (req, res) => {
  try {
    const konten = await Konten.find()      
    .populate({
        path: 'sosmed_id',
        populate: {
        path: 'id_klien',
        model: 'Klien'
        }
      });
    res.status(200).json(konten);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single content by ID
exports.getKontenById = async (req, res) => {
  try {
    const konten = await Konten.findById(req.params.id)    
    .populate({
        path: 'sosmed_id',
        populate: {
        path: 'id_klien',
        model: 'Klien'
        }
      });

    if (!konten) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json(konten);
  } catch (error) {
    console.error('Error fetching content by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a content by ID
exports.updateKonten = async (req, res) => {
  try {
    const { id_klien, sosmed_id, jadwal, judul, format_konten, caption, copy, link_output, status_upload } = req.body;

    // Validate foreign keys
    if (id_klien) {
      const klienExists = await Klien.findById(id_klien);
      if (!klienExists) {
        return res.status(400).json({ message: 'Klien not found' });
      }
    }

    if (sosmed_id) {
      const sosmedExists = await SosialMedia.findById(sosmed_id);
      if (!sosmedExists) {
        return res.status(400).json({ message: 'SosialMedia not found' });
      }
    }

    const updatedKonten = await Konten.findByIdAndUpdate(
      req.params.id,
      {
        id_klien,
        sosmed_id,
        jadwal,
        judul,
        format_konten,
        caption,
        copy,
        link_output,
        status_upload,
        updated_at: Date.now()
      },
      { new: true }
    );

    if (!updatedKonten) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json(updatedKonten);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a content by ID
exports.deleteKonten = async (req, res) => {
  try {
    const deletedKonten = await Konten.findByIdAndDelete(req.params.id);

    if (!deletedKonten) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
