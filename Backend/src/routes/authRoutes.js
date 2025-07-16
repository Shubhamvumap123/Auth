const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me',authMiddleware,authController.getProfile);
router.put('/me',authMiddleware,authController.updateProfile);

module.exports = router;
