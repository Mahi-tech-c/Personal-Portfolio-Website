const Skill = require('../models/Skill');

// @desc    Get all skills (grouped by category)
// @route   GET /api/skills
const getSkills = async (req, res, next) => {
    try {
        let skills = await Skill.find();

        // Sort by category then proficiency descending
        skills.sort((a, b) => {
            if (a.category !== b.category) return a.category.localeCompare(b.category);
            return b.proficiency - a.proficiency;
        });

        // Group by category
        const grouped = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});

        res.status(200).json({ success: true, data: skills, grouped });
    } catch (error) {
        next(error);
    }
};

// @desc    Create skill
// @route   POST /api/skills
const createSkill = async (req, res, next) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json({ success: true, data: skill });
    } catch (error) {
        next(error);
    }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
const updateSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body);
        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }
        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
const deleteSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }
        res.status(200).json({ success: true, message: 'Skill deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
