const express = require('express');
const router = express.Router();
const scheduledContentController = require('../controllers/scheduledContentController');
const auth = require('../middleware/authMiddleware');

// Hanya content planner yang dapat mengakses rute ini
router.get('/', auth(['content_planner']), scheduledContentController.index);
router.get('/:id', auth(['content_planner']), scheduledContentController.get);
router.post('/', auth(['content_planner']), scheduledContentController.create);
router.delete('/:id', auth(['content_planner']), scheduledContentController.delete);

module.exports = router;
