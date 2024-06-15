const express = require('express');
const router = express.Router();
const klienController = require('../controllers/klienController');
const auth = require('../middleware/authMiddleware');

// Hanya admin yang dapat mengakses rute ini
router.get('/', klienController.getAllKlien);
router.get('/:id', klienController.getKlienById);
router.post('/', klienController.createKlien);
router.put('/:id', klienController.updateKlien);
router.delete('/:id', klienController.deleteKlien);

module.exports = router;
