const express = require('express');
const router = express.Router();
const designController = require('../controllers/designController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['designer']), designController.index);
router.get('/:id', auth(['designer']), designController.get);
router.put('/:id', auth(['designer']), designController.update);
router.put('/:id/manage', auth(['designer']), designController.manageTask);

module.exports = router;
