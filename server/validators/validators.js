const { body, validationResult } = require('express-validator');

// Handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// Contact form validation
const contactValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email'),
    body('subject')
        .trim()
        .notEmpty().withMessage('Subject is required')
        .isLength({ min: 2, max: 200 }).withMessage('Subject must be between 2 and 200 characters'),
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters'),
    validate
];

// Login validation
const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate
];

// Project validation
const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Project title is required'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isIn(['Web Development', 'Desktop App', 'IoT', 'Mobile App', 'Machine Learning', 'Other'])
        .withMessage('Invalid category'),
    validate
];

// Skill validation
const skillValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Skill name is required'),
    body('category')
        .notEmpty().withMessage('Category is required'),
    body('proficiency')
        .notEmpty().withMessage('Proficiency is required')
        .isNumeric().withMessage('Proficiency must be a number')
        .isInt({ min: 0, max: 100 }).withMessage('Proficiency must be between 0 and 100'),
    validate
];

module.exports = {
    contactValidation,
    loginValidation,
    projectValidation,
    skillValidation,
    validate
};
