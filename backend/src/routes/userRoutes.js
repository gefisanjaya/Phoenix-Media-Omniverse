const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['admin', 'content_planner']), userController.index);
router.get('/:id', auth(['admin']), userController.getUser);
router.post('/', auth(['admin']), userController.createUser);
router.put('/:id', auth(['admin']), userController.updateUser);
router.delete('/:id',auth(['admin']), userController.deleteUser);


module.exports = router;
