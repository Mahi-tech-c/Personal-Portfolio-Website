const Achievement = require('../models/Achievement');

// @desc    Get all achievements
// @route   GET /api/achievements
const getAchievements = async (req, res, next) => {
    try {
        const achievements = await Achievement.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: achievements });
    } catch (error) {
        next(error);
    }
};

// @desc    Create achievement
// @route   POST /api/achievements
const createAchievement = async (req, res, next) => {
    try {
        const achievement = await Achievement.create(req.body);
        res.status(201).json({ success: true, data: achievement });
    } catch (error) {
        next(error);
    }
};

// @desc    Update achievement
// @route   PUT /api/achievements/:id
const updateAchievement = async (req, res, next) => {
    try {
        const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!achievement) {
            return res.status(404).json({ success: false, message: 'Achievement not found' });
        }
        res.status(200).json({ success: true, data: achievement });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete achievement
// @route   DELETE /api/achievements/:id
const deleteAchievement = async (req, res, next) => {
    try {
        const achievement = await Achievement.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return res.status(404).json({ success: false, message: 'Achievement not found' });
        }
        res.status(200).json({ success: true, message: 'Achievement deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAchievements, createAchievement, updateAchievement, deleteAchievement };
