const { parentPort, workerData } = require('worker_threads');
const axios = require('axios');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const SosialMedia = require('../models/mediaSosial');
const ScheduledContent = require('../models/scheduledContent');
const Konten = require('../models/konten');

const facebookUserAccessToken = 'EAARJC2wb79gBO4lN0yLgiB8PSJZC4AK3PLoWal40njHSEJsE5eG3ZBAGPZCie4cgAMuyBmbVpLQ0P4iCGdPzUFIakIws2tYWUVaZAUUUnHHThFw6XoehL8woMVHsd1dd8tYnk7SftKTd22LFq9wQfWgM6mhoohvzYlZCUZCWVsjB6E1D5mMxIOLfKVgEiu5TSg';

const getInstagramAccountIdFromDB = async (sosmedId) => {
  try {
    const sosmed = await SosialMedia.findById(sosmedId);
    if (sosmed && sosmed.platform === 'instagram') {
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

const createReelMediaObjectContainer = async (instagramAccountId, konten) => {
  try {
    const response = await axios.post(`https://graph.facebook.com/v20.0/${instagramAccountId}/media`, null, {
      params: {
        access_token: facebookUserAccessToken,
        media_type: 'REELS',
        video_url: konten.link_output,
        caption: konten.caption,
        share_to_feed: true
      }
    });
    return response.data.id;
  } catch (error) {
    console.error('Error creating reel media object container:', error);
    return null;
  }
};

const publishMediaObjectContainer = async (instagramAccountId, containerId) => {
  try {
    const response = await axios.post(`https://graph.facebook.com/v20.0/${instagramAccountId}/media_publish`, null, {
      params: {
        access_token: facebookUserAccessToken,
        creation_id: containerId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error publishing media object container:', error);
    throw error;
  }
};

const scheduleContent = async () => {
  let connectionClosed = false;
  try {
    console.log('Worker thread started');

    await mongoose.connect('mongodb://localhost:27017/phoenix', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const { scheduledContentId, sosmedId } = workerData;
    console.log(`Scheduled Content ID: ${scheduledContentId}`);
    console.log(`Sosmed ID: ${sosmedId}`);

    const scheduledContent = await ScheduledContent.findById(scheduledContentId).populate('konten_id');
    if (!scheduledContent) {
      throw new Error('ScheduledContent not found');
    }

    const konten = scheduledContent.konten_id;

    const instagramAccountId = await getInstagramAccountIdFromDB(sosmedId);
    if (!instagramAccountId) {
      throw new Error('No Instagram business account found');
    }

    let containerId;
    if (konten.format_konten === 'REELS') {
      containerId = await createReelMediaObjectContainer(instagramAccountId, konten);
    } else {
      containerId = await createMediaObjectContainer(instagramAccountId, konten);
    }

    if (!containerId) {
      throw new Error('Failed to create media object container');
    }

    const currentDate = moment().tz('Etc/UTC').add(7, 'hours'); // Waktu sekarang di UTC ditambah 7 jam
    const scheduleDateRaw = konten.jadwal;

    console.log(`Raw schedule_date from DB: ${scheduleDateRaw}`);

    const scheduleDate = moment(scheduleDateRaw).tz('Etc/UTC'); // Waktu jadwal di UTC

    if (!scheduleDate.isValid()) {
      throw new Error('Invalid scheduled date value');
    }

    console.log(`Current Date (UTC): ${currentDate.format()}`);
    console.log(`Scheduled Date (UTC): ${scheduleDate.format()}`);

    const delay = scheduleDate.diff(currentDate);

    if (delay > 0) {
      console.log(`Scheduling content to be published in ${delay} milliseconds`);
      setTimeout(async () => {
        try {
          console.log('Starting content publishing process');
          const publishResponse = await publishMediaObjectContainer(instagramAccountId, containerId);
          console.log('Publish response:', publishResponse);
          konten.status_upload = 'uploaded';
          console.log('Saving updated konten status to the database...');
          await konten.save();
          console.log('Konten status updated and saved successfully');
          parentPort.postMessage({ success: true, message: 'Content scheduled successfully' });
          console.log('Content publishing process completed');
        } catch (error) {
          console.error('Error during publishing or saving konten:', error);
          parentPort.postMessage({ success: false, message: error.message });
        } finally {
          if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            connectionClosed = true;
            console.log('MongoDB connection closed');
          }
          parentPort.postMessage('finish');
        }
      }, delay);
    } else {
      throw new Error('Scheduled date is in the past');
    }
  } catch (error) {
    console.error('Error scheduling content:', error);
    parentPort.postMessage({ success: false, message: error.message });
    if (mongoose.connection.readyState === 1 && !connectionClosed) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  } finally {
    console.log('Worker thread finished');
  }
};

console.log(`Script started at (UTC): ${moment().tz('Etc/UTC').format()}`);

scheduleContent();
