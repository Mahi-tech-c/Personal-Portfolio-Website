const Profile = require('../models/Profile');

// @desc    Get profile
// @route   GET /api/profile
const getProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

// @desc    Update profile
// @route   PUT /api/profile
const updateProfile = async (req, res, next) => {
    try {
        let profile = await Profile.findOne();

        if (!profile) {
            profile = await Profile.create(req.body);
        } else {
            profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
                new: true,
                runValidators: true
            });
        }

        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};

module.exports = { getProfile, updateProfile };
