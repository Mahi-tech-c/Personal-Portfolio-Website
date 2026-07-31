const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Project description is required']
    },
    shortDescription: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Web Development', 'Desktop App', 'IoT', 'Mobile App', 'Machine Learning', 'Other']
    },
    technologies: {
        type: [String],
        default: []
    },
    imageUrl: {
        type: String,
        default: ''
    },
    githubUrl: {
        type: String,
        default: ''
    },
    liveUrl: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'planned'],
        default: 'completed'
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
