const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['content_planner']), taskController.getTasks);
router.post('/', auth(['content_planner']), taskController.createTask);
router.put('/:id', auth(['content_planner', 'designer', 'videographer']), taskController.updateTask);
router.delete('/:id', auth(['content_planner']), taskController.deleteTask);

module.exports = router;
