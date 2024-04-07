// userRoutes.js

const express = require('express');
const router = express.Router();
const { registerController } = require('../controllers/userController');

// Kullanıcı kaydı için POST rotası
router.post('/register', registerController);

module.exports = router;