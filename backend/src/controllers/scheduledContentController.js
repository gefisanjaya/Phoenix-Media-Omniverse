const { Worker } = require('worker_threads');
const path = require('path');
const ScheduledContent = require('../models/scheduledContent');
const Konten = require('../models/konten');
const SosialMedia = require('../models/mediaSosial');

// Variabel global untuk menyimpan referensi ke setiap thread yang aktif
let activeWorkers = [];

exports.index = async (req, res) => {
  try {
    const scheduledContents = await ScheduledContent.find().populate('konten_id');
    res.json(scheduledContents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const scheduledContent = await ScheduledContent.findById(req.params.id)
    .populate({
      path: 'konten_id',
      populate: {
        path: 'sosmed_id',
        model: 'SosialMedia'
      }
    });
    if (!scheduledContent) return res.status(404).json({ message: 'Scheduled Content not found' });
    res.json(scheduledContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const { konten_id } = req.body;

  try {
    const konten = await Konten.findById(konten_id).populate('sosmed_id');
    if (!konten) return res.status(404).json({ message: 'Konten tidak ditemukan' });

    if (konten.status_upload !== 'not_uploaded') {
      return res.status(400).json({ message: 'Konten tidak siap untuk diunggah' });
    }

    const { jadwal: scheduled_date } = konten;

    const sosialMedia = konten.sosmed_id;
    if (!sosialMedia) return res.status(404).json({ message: 'Media Sosial tidak ditemukan' });

    const platform = sosialMedia.platform;

    const scheduledContent = new ScheduledContent({ konten_id, scheduled_date, platform });
    await scheduledContent.save();
  
    konten.status_upload = 'scheduled';
    await konten.save();

    // Buat instance worker di sini setelah menyimpan scheduledContent
    const worker = new Worker(path.resolve(__dirname, '../worker/schedulerWorker.js'), {
      workerData: {
        scheduledContentId: scheduledContent._id.toString(),
        sosmedId: sosialMedia._id.toString(),
        kontenFormat: konten.format_konten
      }
    });

    // Tambahkan worker ke dalam daftar activeWorkers
    activeWorkers.push(worker);
    console.log(`Total active workers: ${activeWorkers.length}`);

    worker.on('message', (message) => {
      if (message.success) {
        console.log('Penjadwalan berhasil:', message.message);
      } else {
        console.error('Penjadwalan gagal:', message.message);
      }
    });

    worker.on('error', (error) => {
      console.error('Kesalahan pada worker:', error);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker berhenti dengan kode keluar ${code}`);
      }
      // Hapus worker dari daftar activeWorkers setelah selesai atau berhenti
      activeWorkers = activeWorkers.filter(w => w !== worker);
      console.log(`Total active workers: ${activeWorkers.length}`);
    });

    res.status(201).json({ scheduledContent_id: scheduledContent._id }); // Kirimkan hanya scheduledContent_id
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const scheduledContent = await ScheduledContent.findById(req.params.id);
    if (!scheduledContent) return res.status(404).json({ message: 'Scheduled Content tidak ditemukan' });

    await scheduledContent.remove();
    res.json({ message: 'Scheduled Content dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
