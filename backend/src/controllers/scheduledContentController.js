const ScheduledContent = require('../models/scheduledContent');
const Konten = require('../models/konten');
const { Worker } = require('worker_threads');
const path = require('path');

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
    const scheduledContent = await ScheduledContent.findById(req.params.id).populate('konten_id');
    if (!scheduledContent) return res.status(404).json({ message: 'Scheduled Content not found' });
    res.json(scheduledContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const { konten_id, scheduled_date, platform } = req.body;

  try {
    const konten = await Konten.findById(konten_id);
    if (!konten) return res.status(404).json({ message: 'Konten not found' });

    if (konten.status_upload !== 'ready') {
      return res.status(400).json({ message: 'Konten is not ready for upload' });
    }

    const scheduledContent = new ScheduledContent({ konten_id, scheduled_date, platform });
    await scheduledContent.save();

    // Menggunakan worker thread untuk penjadwalan unggahan
    const worker = new Worker(path.resolve(__dirname, '../worker/schedulerWorker.js'), {
      workerData: { konten_id: scheduledContent._id, platform, scheduled_date }
    });

    worker.on('message', (message) => {
      if (message.success) {
        console.log('Scheduling successful:', message.message);
      } else {
        console.error('Scheduling failed:', message.message);
      }
    });

    worker.on('error', (error) => {
      console.error('Worker error:', error);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });

    res.status(201).json(scheduledContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  const { scheduled_date, platform } = req.body;

  try {
    const scheduledContent = await ScheduledContent.findById(req.params.id);
    if (!scheduledContent) return res.status(404).json({ message: 'Scheduled Content not found' });

    if (scheduled_date) scheduledContent.scheduled_date = scheduled_date;
    if (platform) scheduledContent.platform = platform;
    await scheduledContent.save();
    res.json(scheduledContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const scheduledContent = await ScheduledContent.findById(req.params.id);
    if (!scheduledContent) return res.status(404).json({ message: 'Scheduled Content not found' });

    await scheduledContent.remove();
    res.json({ message: 'Scheduled Content deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
