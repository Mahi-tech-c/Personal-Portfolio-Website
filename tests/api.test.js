// tests/api.test.js
/**
 * Public API integration tests – ensure the portfolio endpoints work and validate input.
 * Uses a dedicated test MongoDB database (separate from production).
 */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Project = require('../src/models/Project');
const Skill = require('../src/models/Skill');
const Contact = require('../src/models/Contact');

const TEST_DB_URI = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/portfolio_test_api';

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  // Clean collections and insert minimal fixtures
  await Promise.all([
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Contact.deleteMany({}),
  ]);
  await Project.create({
    title: 'Demo Project',
    description: 'Demo description',
    imageUrl: 'http://example.com/img.png',
    liveUrl: 'http://example.com',
    repoUrl: 'http://github.com/example',
    techStack: ['Node', 'Express'],
  });
  await Skill.create({ name: 'JavaScript', proficiency: 95 });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe('Public API endpoints', () => {
  test('GET /api/projects returns list', async () => {
    const res = await request(app).get('/api/projects').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('title', 'Demo Project');
  });

  test('GET /api/skills returns list', async () => {
    const res = await request(app).get('/api/skills').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(s => s.name === 'JavaScript')).toBe(true);
  });

  test('GET /api/portfolio aggregates data', async () => {
    const res = await request(app).get('/api/portfolio').expect(200);
    expect(res.body).toHaveProperty('projects');
    expect(res.body).toHaveProperty('skills');
    expect(res.body.projects.length).toBeGreaterThan(0);
    expect(res.body.skills.length).toBeGreaterThan(0);
  });
});

describe('Contact form', () => {
  test('POST /api/contact with valid data succeeds', async () => {
    const payload = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Hello',
      message: 'Just testing the contact form',
    };
    const res = await request(app).post('/api/contact').send(payload).expect(201);
    expect(res.body).toHaveProperty('message');
  });

  test('POST /api/contact missing required fields fails', async () => {
    const payload = { name: 'Bad Request' }; // missing email/message
    const res = await request(app).post('/api/contact').send(payload).expect(400);
    expect(res.body).toHaveProperty('errors');
  });
});

describe('Admin route protection', () => {
  test('GET /admin/projects without token returns 401', async () => {
    await request(app).get('/admin/projects').expect(401);
  });
});
