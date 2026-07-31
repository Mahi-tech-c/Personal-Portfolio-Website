const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    bio: {
        type: String,
        required: [true, 'Bio is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    birthday: {
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    },
    resumeUrl: {
        type: String,
        default: ''
    },
    socialLinks: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' },
        website: { type: String, default: '' }
    },
    education: [{
        degree: String,
        institution: String,
        year: String,
        description: String,
        cgpa: String
    }],
    experience: [{
        title: String,
        company: String,
        year: String,
        description: String
    }],
    typingTitles: {
        type: [String],
        default: ['Web Developer', 'Problem Solver', 'Tech Enthusiast']
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
