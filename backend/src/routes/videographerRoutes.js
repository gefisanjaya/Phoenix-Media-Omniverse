const express = require('express');
const router = express.Router();
const videographerController = require('../controllers/videographerController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['videographer']), videographerController.index);
router.get('/:id', auth(['videographer']), videographerController.get);
router.put('/:id', auth(['videographer']), videographerController.update);
router.put('/:id/manage', auth(['videographer']), videographerController.manageTask);

module.exports = router;