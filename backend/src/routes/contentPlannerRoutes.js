const express = require('express');
const router = express.Router();
const contentPlannerController = require('../controllers/contentPlannerController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth(['content_planner']), contentPlannerController.index);
router.get('/:id', auth(['content_planner']), contentPlannerController.get);
router.post('/', auth(['content_planner']), contentPlannerController.create);
router.put('/:id', auth(['content_planner']), contentPlannerController.update);

module.exports = router;
