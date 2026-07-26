// seed.js – populate MongoDB with sample projects, skills, and an admin user
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Project = require('./src/models/Project');
const Skill = require('./src/models/Skill');
const User = require('./src/models/User');

const rawUri = process.env.MONGODB_URI;
const mongoURI = rawUri && !rawUri.includes('<username>') && !rawUri.includes('<password>')
  ? rawUri
  : 'mongodb://127.0.0.1:27017/portfolio';

const sampleProjects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio built with Node.js, Express, and MongoDB, featuring a sleek UI and contact form.',
    imageUrl: '/images/project1.png',
    liveUrl: 'https://your-portfolio.vercel.app',
    repoUrl: 'https://github.com/Mahi-tech-c/Personal-Portfolio-Website',
    techStack: ['Node.js', 'Express', 'MongoDB', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Task Manager API',
    description: 'RESTful API for task management with JWT authentication.',
    imageUrl: '/images/project2.png',
    liveUrl: '',
    repoUrl: 'https://github.com/example/task-manager',
    techStack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
];

const sampleSkills = [
  { name: 'Node.js', proficiency: 90 },
  { name: 'Express', proficiency: 85 },
  { name: 'MongoDB', proficiency: 80 },
  { name: 'JavaScript', proficiency: 95 },
  { name: 'HTML/CSS', proficiency: 92 },
];

const adminEmail = 's29116724@gmail.com';
const adminPlainPassword = 'admin123'; // default password – change after first login

(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    // Clear existing collections (optional)
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await User.deleteMany({ email: adminEmail });

    // Insert projects & skills
    await Project.insertMany(sampleProjects);
    await Skill.insertMany(sampleSkills);
    console.log('Sample projects and skills inserted');

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPlainPassword, salt);
    const adminUser = new User({ email: adminEmail, passwordHash, name: 'Salma' });
    await adminUser.save();
    console.log(`Admin user created (email: ${adminEmail}, password: ${adminPlainPassword})`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
