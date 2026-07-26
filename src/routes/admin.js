// src/routes/admin.js
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');

const projectController = require('../controllers/projectController');
const skillController = require('../controllers/skillController');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

// Auth route (login) – no middleware
router.post('/login', authController.login);

// Protect all following admin routes
router.use(authMiddleware);

// Projects CRUD
router.post('/projects', projectController.createProject);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

// Skills CRUD
router.post('/skills', skillController.createSkill);
router.put('/skills/:id', skillController.updateSkill);
router.delete('/skills/:id', skillController.deleteSkill);

// Contact messages list (admin view)
router.get('/contacts', contactController.listMessages);

module.exports = router;
