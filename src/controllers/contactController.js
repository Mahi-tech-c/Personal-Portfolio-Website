// src/controllers/contactController.js
const { body, validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const { sendContactEmail } = require('../services/emailService');

// Validation middleware (can be used directly in route)
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('message').trim().notEmpty().withMessage('Message cannot be empty'),
];

// POST /contact – handle submission
const submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, subject, message } = req.body;
  try {
    // Store in DB
    const entry = new ContactMessage({ name, email, subject, message });
    await entry.save();
    // Send notification email
    await sendContactEmail({ name, email, subject, message });
    res.status(201).json({ message: 'Contact submission received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: list all contact messages
const listMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  validateContact,
  submitContact,
  listMessages,
};
