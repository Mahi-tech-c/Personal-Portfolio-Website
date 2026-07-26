const Project = require('../models/Project');

// Helper to fetch all projects (used by API route)
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper to fetch raw data for portfolio aggregation
const getAllProjectsRaw = async () => {
  return await Project.find().sort({ createdAt: -1 });
};

// Admin: create a new project
const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Admin: update a project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Admin: delete a project
const deleteProject = async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProjects,
  getAllProjectsRaw,
  createProject,
  updateProject,
  deleteProject,
};
