const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { loginValidation } = require('../validators/validators');

router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

module.exports = router;
