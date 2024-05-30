const express = require('express');
const router = express.Router();
const sosialMediaController = require('../controllers/sosialMediaController');
const auth = require('../middleware/authMiddleware');

// Hanya admin yang dapat mengakses rute ini
router.get('/', auth(['admin']), sosialMediaController.index);
router.get('/:id', auth(['admin']), sosialMediaController.get);
router.post('/', auth(['admin']), sosialMediaController.create);
router.put('/:id', auth(['admin']), sosialMediaController.update);
router.delete('/:id', auth(['admin']), sosialMediaController.delete);

module.exports = router;
