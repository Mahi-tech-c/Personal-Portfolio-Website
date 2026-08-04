const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
const getProjects = async (req, res, next) => {
    try {
        const { category, search, page = 1, limit = 10, featured } = req.query;
        const query = {};

        if (category && category !== 'all') {
            query.category = category;
        }

        if (featured === 'true') {
            query.featured = true;
        }

        let projects = await Project.find(query);

        // Search filter (in-memory for NeDB compatibility)
        if (search) {
            const searchLower = search.toLowerCase();
            projects = projects.filter(p =>
                p.title.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                (p.technologies || []).some(t => t.toLowerCase().includes(searchLower))
            );
        }

        // Sort by createdAt descending
        projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const total = projects.length;

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const paginated = projects.slice(startIndex, startIndex + limitNum);

        res.status(200).json({
            success: true,
            data: paginated,
            pagination: {
                total,
                page: pageNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
const getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// @desc    Create project
// @route   POST /api/projects
const createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
