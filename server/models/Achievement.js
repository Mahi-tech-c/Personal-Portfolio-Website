const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Achievement title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    date: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: 'trophy'
    }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
