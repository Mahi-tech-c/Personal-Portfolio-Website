const Skill = require('../models/Skill');

// Public: get all skills (used by portfolio aggregation)
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ name: 1 });
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper for internal use (raw data without response)
const getAllSkillsRaw = async () => {
  return await Skill.find().sort({ name: 1 });
};

// Admin: create a new skill
const createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Admin: update an existing skill
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Admin: delete a skill
const deleteSkill = async (req, res) => {
  try {
    const result = await Skill.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllSkills,
  getAllSkillsRaw,
  createSkill,
  updateSkill,
  deleteSkill,
};
