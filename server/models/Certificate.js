const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Certificate title is required'],
        trim: true
    },
    issuer: {
        type: String,
        required: [true, 'Issuer is required']
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    description: {
        type: String,
        default: ''
    },
    credentialUrl: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
