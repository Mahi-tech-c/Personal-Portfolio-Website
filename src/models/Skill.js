const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: Number, min: 0, max: 100 }, // percentage
});

module.exports = mongoose.model('Skill', skillSchema);
