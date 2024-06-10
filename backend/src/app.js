const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());


// Konfigurasi CORS
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const scheduledContentRoutes = require('./routes/scheduledContentRoutes');
const sosialMediaRoutes = require('./routes/sosialMediaRoutes');
const klienRoutes = require('./routes/klienRoutes');
const kontenRoutes = require('./routes/kontenRoutes');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/scheduled-contents', scheduledContentRoutes);
app.use('/social-media', sosialMediaRoutes);
app.use('/klien', klienRoutes);
app.use('/konten', kontenRoutes);


// Melayani file yang diunggah
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/phoenix', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log('Server is running on port 3000')))
  .catch(err => console.error(err));
