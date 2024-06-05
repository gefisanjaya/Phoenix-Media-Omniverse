const express = require('express');
const router = express.Router();
const kontenController = require('../controllers/kontenController');
const auth = require('../middleware/authMiddleware');

router.post('/',auth(['content_planner']), kontenController.createKonten);
router.get('/', auth(['content_planner']), kontenController.getAllKonten);
router.get('/:id', auth(['content_planner']), kontenController.getKontenById);
router.put('/:id',auth(['content_planner']), kontenController.updateKontenById);
router.delete('/:id', auth(['content_planner']), kontenController.deleteKontenById);

module.exports = router;