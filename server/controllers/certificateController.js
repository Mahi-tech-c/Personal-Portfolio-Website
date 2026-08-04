const Certificate = require('../models/Certificate');

// @desc    Get all certificates
// @route   GET /api/certificates
const getCertificates = async (req, res, next) => {
    try {
        let certificates = await Certificate.find();
        certificates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json({ success: true, data: certificates });
    } catch (error) {
        next(error);
    }
};

// @desc    Create certificate
// @route   POST /api/certificates
const createCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.create(req.body);
        res.status(201).json({ success: true, data: certificate });
    } catch (error) {
        next(error);
    }
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
const updateCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body);
        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }
        res.status(200).json({ success: true, data: certificate });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
const deleteCertificate = async (req, res, next) => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) {
            return res.status(404).json({ success: false, message: 'Certificate not found' });
        }
        res.status(200).json({ success: true, message: 'Certificate deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
