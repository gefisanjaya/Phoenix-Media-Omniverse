const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['admin', 'content_planner']), userController.index);
router.get('/:id', auth(['admin']), userController.get);
router.post('/', auth(['admin']), userController.create);
router.put('/:id', auth(['admin']), userController.update);
router.delete('/:id',auth(['admin']), userController.delete);


module.exports = router;
