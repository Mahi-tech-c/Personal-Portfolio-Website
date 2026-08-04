const Message = require('../models/Message');

// @desc    Submit contact form
// @route   POST /api/contact
const submitContact = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        const newMessage = await Message.create({ name, email, subject, message });

        // Email sending is optional - skip if not configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const { sendContactNotification, sendContactConfirmation } = require('../utils/email');
                await sendContactNotification({ name, email, subject, message });
                await sendContactConfirmation({ name, email, subject, message });
            } catch (emailError) {
                console.error('Email sending failed:', emailError.message);
            }
        }

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.',
            data: newMessage
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all messages
// @route   GET /api/messages
const getMessages = async (req, res, next) => {
    try {
        let messages = await Message.find();
        messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }
        res.status(200).json({ success: true, message: 'Message deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitContact, getMessages, deleteMessage };
