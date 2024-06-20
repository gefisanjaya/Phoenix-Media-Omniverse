const express = require('express');
const router = express.Router();
const kontenController = require('../controllers/kontenController');
const auth = require('../middleware/authMiddleware');

router.post('/',auth(['admin', 'content_planner', 'designer', 'videographer']), kontenController.createKonten);
router.get('/', auth(['admin', 'content_planner', 'designer', 'videographer']), kontenController.getAllKonten);
router.get('/:id', auth(['content_planner']), kontenController.getKontenById);
router.put('/:id',auth(['content_planner']), kontenController.updateKonten);
router.delete('/:id', auth(['content_planner']), kontenController.deleteKonten);

module.exports = router;
