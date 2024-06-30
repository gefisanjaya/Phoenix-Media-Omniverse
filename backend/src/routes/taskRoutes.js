const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['admin', 'content_planner', 'designer', 'videographer']), taskController.getTasks);
router.post('/', auth(['content_planner']), taskController.createTask);
router.put('/:id', auth(['content_planner', 'designer', 'videographer']), taskController.updateTask);
router.delete('/:id', auth(['content_planner']), taskController.deleteTask);
router.get('/:id', auth(['designer', 'videographer']), taskController.get);
router.put('/:id/manage', auth(['designer', 'videographer']), taskController.manageTask);
router.patch('/:id', auth(['content_planner', 'designer', 'videographer']), taskController.patchTaskStatus);  // Ensure this is added

module.exports = router;
