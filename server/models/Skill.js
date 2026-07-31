const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Programming Languages', 'Web Development', 'Database', 'Tools & Technologies', 'Soft Skills', 'Other']
    },
    proficiency: {
        type: Number,
        required: [true, 'Proficiency level is required'],
        min: 0,
        max: 100
    },
    icon: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
