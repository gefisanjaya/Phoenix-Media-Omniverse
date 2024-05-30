const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/confirm-password', authController.confirmPassword);
router.put('/update-password', authController.updatePassword);

module.exports = router;
