const express = require('express');
const router = express.Router();
const { getProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const { projectValidation } = require('../validators/validators');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, projectValidation, createProject);
router.put('/:id', protect, projectValidation, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
