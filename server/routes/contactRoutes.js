const express = require('express');
const router = express.Router();
const { submitContact, getMessages, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { contactValidation } = require('../validators/validators');
const { contactLimiter } = require('../middleware/rateLimiter');

router.post('/', contactLimiter, contactValidation, submitContact);
router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
