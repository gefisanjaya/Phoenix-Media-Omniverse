const express = require('express');
const router = express.Router();
const klienController = require('../controllers/klienController');
const auth = require('../middleware/authMiddleware');

// Hanya admin yang dapat mengakses rute ini
router.get('/', klienController.getAllClients);
router.get('/:id', klienController.getClientById);
router.post('/', klienController.createClient);
router.put('/:id', klienController.updateClient);
router.delete('/:id', klienController.deleteClient);

module.exports = router;
