const express = require('express');
const router = express.Router();
const klienController = require('../controllers/klienController');
const auth = require('../middleware/authMiddleware');

// Hanya admin yang dapat mengakses rute ini
router.get('/', auth(['admin']), klienController.index);
router.get('/:id', auth(['admin']), klienController.get);
router.post('/', auth(['admin']), klienController.create);
router.put('/:id', auth(['admin']), klienController.update);
router.delete('/:id', auth(['admin']), klienController.delete);

module.exports = router;
