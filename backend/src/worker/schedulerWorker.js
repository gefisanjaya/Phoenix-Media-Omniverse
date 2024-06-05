const { parentPort, workerData } = require('worker_threads');
const axios = require('axios');
const mongoose = require('mongoose');
const SosialMedia = require('../models/mediaSosial');
const ScheduledContent = require('../models/scheduledContent');
const Konten = require('../models/konten');

const facebookUserAccessToken = 'EAARJC2wb79gBO4lN0yLgiB8PSJZC4AK3PLoWal40njHSEJsE5eG3ZBAGPZCie4cgAMuyBmbVpLQ0P4iCGdPzUFIakIws2tYWUVaZAUUUnHHThFw6XoehL8woMVHsd1dd8tYnk7SftKTd22LFq9wQfWgM6mhoohvzYlZCUZCWVsjB6E1D5mMxIOLfKVgEiu5TSg';

// Function to get instagramAccountId from the database
const getInstagramAccountIdFromDB = async () => {
  try {
    const sosmed = await SosialMedia.findOne({ platform: 'instagram' });
    if (sosmed) {
      return sosmed.sosmed_id;
    } else {
      console.error('Instagram account not found in database');
      return null;
    }
  } catch (error) {
    console.error('Error fetching Instagram account from database:', error);
    return null;
  }
};

const createMediaObjectContainer = async (instagramAccountId, konten) => {
  try {
    const response = await axios.post(`https://graph.facebook.com/v20.0/${instagramAccountId}/media`, null, {
      params: {
        access_token: facebookUserAccessToken,
        image_url: konten.link_output,
        caption: konten.caption
      }
    });
    return response.data.id;
  } catch (error) {
    console.error('Error creating media object container:', error);
    return null;
  }
};

const publishMediaObjectContainer = async (instagramAccountId, containerId) => {
  try {
    await axios.post(`https://graph.facebook.com/v20.0/${instagramAccountId}/media_publish`, null, {
      params: {
        access_token: facebookUserAccessToken,
        creation_id: containerId
      }
    });
  } catch (error) {
    console.error('Error publishing media object container:', error);
  }
};

const scheduleContent = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/phoenix', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Convert workerData to ObjectId if it's a string
    const scheduledContentId = typeof workerData === 'string' ? workerData : workerData;
    console.log(scheduledContentId)

    const scheduledContent = await ScheduledContent.findById(scheduledContentId).populate('konten_id');
    if (!scheduledContent) {
      throw new Error('ScheduledContent not found');
    }

    const konten = scheduledContent.konten_id;
    const sosmed = await SosialMedia.findById(konten.sosmed_id);
    if (!sosmed) {
      throw new Error('SosialMedia not found');
    }

    const instagramAccountId = await getInstagramAccountIdFromDB();
    if (!instagramAccountId) {
      throw new Error('No Instagram business account found');
    }

    const containerId = await createMediaObjectContainer(instagramAccountId, konten);
    if (!containerId) {
      throw new Error('Failed to create media object container');
    }

    const currentDate = new Date();
    
    // Mengambil atribut jadwal dari konten
    const scheduleDateRaw = konten.jadwal;

    // Debugging log untuk scheduleDateRaw
    console.log(`Raw schedule_date from DB: ${scheduleDateRaw}`);

    const scheduleDate = new Date(scheduleDateRaw);
    
    // Debugging log untuk memastikan validitas scheduleDate
    if (isNaN(scheduleDate.getTime())) {
      throw new Error('Invalid scheduled date value');
    }

    // Menampilkan waktu sekarang dan waktu yang dijadwalkan
    console.log(`Current Date: ${currentDate.toISOString()}`);
    console.log(`Scheduled Date: ${scheduleDate.toISOString()}`);

    const delay = scheduleDate - currentDate;

    if (delay > 0) {
      console.log(`Scheduling content to be published in ${delay} milliseconds`);
      setTimeout(async () => {
        await publishMediaObjectContainer(instagramAccountId, containerId);
        konten.status_upload = 'uploaded';
        await konten.save();
        parentPort.postMessage({ success: true, message: 'Content scheduled successfully' });
      }, delay);
    } else {
      throw new Error('Scheduled date is in the past');
    }
  } catch (error) {
    console.error('Error scheduling content:', error);
    parentPort.postMessage({ success: false, message: error.message });
  } finally {
    mongoose.connection.close();
  }
};

// Panggil fungsi untuk memulai proses penjadwalan konten
scheduleContent();
