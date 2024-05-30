const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const contentPlannerRoutes = require('./routes/contentPlannerRoutes');
const designRoutes = require('./routes/designRoutes');
const videographerRoutes = require('./routes/videographerRoutes');
const scheduledContentRoutes = require('./routes/scheduledContentRoutes');
const sosialMediaRoutes = require('./routes/sosialMediaRoutes');
const klienRoutes = require('./routes/klienRoutes');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/content-planner', contentPlannerRoutes);
app.use('/design', designRoutes);
app.use('/videographer', videographerRoutes);
app.use('/scheduled-contents', scheduledContentRoutes);
app.use('/social-media', sosialMediaRoutes);
app.use('/klien', klienRoutes);

// Melayani file yang diunggah
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log('Server is running on port 3000')))
  .catch(err => console.error(err));
