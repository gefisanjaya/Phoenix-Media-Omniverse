const express = require('express');
const router = express.Router();
const sosialMediaController = require('../controllers/sosialMediaController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['admin', 'content_planner']), sosialMediaController.index);
router.get('/:id', auth(['admin']), sosialMediaController.getSosmedById);
router.post('/', auth(['admin']), sosialMediaController.createSosmed);
router.put('/:id', auth(['admin']), sosialMediaController.updateSosmed);
router.delete('/:id', auth(['admin']), sosialMediaController.deleteSosmed);

module.exports = router;
