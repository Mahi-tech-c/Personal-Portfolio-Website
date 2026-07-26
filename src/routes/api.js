// src/routes/api.js
const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const skillController = require('../controllers/skillController');
const contactController = require('../controllers/contactController');

// Public portfolio endpoints
router.get('/projects', projectController.getAllProjects);
router.get('/skills', skillController.getAllSkills);
router.get('/portfolio', async (req, res) => {
  // Aggregate data (could be customized later)
  const projects = await projectController.getAllProjectsRaw();
  const skills = await skillController.getAllSkillsRaw();
  res.json({ projects, skills });
});

// Contact form endpoint
router.post('/contact', contactController.submitContact);

module.exports = router;
