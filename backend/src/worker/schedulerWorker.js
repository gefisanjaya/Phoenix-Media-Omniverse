const { parentPort, workerData } = require('worker_threads');
const axios = require('axios');
const Konten = require('../models/konten');
const ScheduledContent = require('../models/scheduledContent');
const SosialMedia = require('../models/mediaSosial');

async function schedulePost() {
  try {
    const { konten_id, platform, scheduled_date } = workerData;

    const konten = await Konten.findById(konten_id);
    if (!konten) {
      parentPort.postMessage({ success: false, message: 'Konten not found' });
      return;
    }

    const sosialMediaAccount = await SosialMedia.findOne({ platform });
    if (!sosialMediaAccount) {
      parentPort.postMessage({ success: false, message: 'Social Media Account not found' });
      return;
    }

    const accessToken = sosialMediaAccount.access_token;

    // Contoh sederhana untuk mengunggah ke Instagram
    if (platform === 'instagram') {
      const response = await axios.post('https://api.instagram.com/v1/media', {
        media_type: 'image',
        caption: konten.caption,
        image_url: konten.image_url,
        access_token: accessToken
      });

      if (response.data && response.data.id) {
        await ScheduledContent.findByIdAndUpdate(konten_id, { status: 'posted' });
        parentPort.postMessage({ success: true, message: 'Posted successfully' });
      } else {
        parentPort.postMessage({ success: false, message: 'Failed to post' });
      }
    } else {
      parentPort.postMessage({ success: false, message: 'Unsupported platform' });
    }
  } catch (error) {
    parentPort.postMessage({ success: false, message: error.message });
  }
}

schedulePost();
