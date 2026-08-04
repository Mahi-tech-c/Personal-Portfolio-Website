const express = require('express');
const router = express.Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { protect } = require('../middleware/auth');
const { skillValidation } = require('../validators/validators');

router.get('/', getSkills);
router.post('/', protect, skillValidation, createSkill);
router.put('/:id', protect, skillValidation, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;
