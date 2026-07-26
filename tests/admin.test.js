// tests/admin.test.js
/**
 * Integration tests for admin routes (auth, projects, skills, contacts).
 * Uses the exported Express app with Supertest and a dedicated test MongoDB database.
 */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Project = require('../src/models/Project');
const Skill = require('../src/models/Skill');
const Contact = require('../src/models/Contact');

// Use a separate test DB to avoid polluting production data.
const TEST_DB_URI = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/portfolio_test';

let adminToken = '';

beforeAll(async () => {
  // Connect to test DB
  await mongoose.connect(TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  // Clean collections
  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Contact.deleteMany({}),
  ]);
  // Create admin user (matches credentials used in the app)
  const admin = new User({ email: 's29116724@gmail.com', name: 'Salma' });
  await admin.setPassword('admin123');
  await admin.save();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe('Admin authentication', () => {
  test('login returns JWT', async () => {
    const res = await request(app)
      .post('/admin/login')
      .send({ email: 's29116724@gmail.com', password: 'admin123' })
      .expect(200);
    expect(res.body).toHaveProperty('token');
    adminToken = res.body.token;
  });
});

describe('Project CRUD', () => {
  let projId;
  test('create project', async () => {
    const payload = {
      title: 'Test Project',
      description: 'A project for testing',
      imageUrl: 'http://example.com/img.png',
      liveUrl: 'http://example.com',
      repoUrl: 'http://github.com/example',
      techStack: ['Node', 'Express'],
    };
    const res = await request(app)
      .post('/admin/projects')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(payload)
      .expect(201);
    expect(res.body).toMatchObject({ title: payload.title });
    projId = res.body._id;
  });

  test('list projects', async () => {
    const res = await request(app)
      .get('/admin/projects')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(p => p._id === projId)).toBe(true);
  });

  test('update project', async () => {
    const res = await request(app)
      .put(`/admin/projects/${projId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Updated Title' })
      .expect(200);
    expect(res.body.title).toBe('Updated Title');
  });

  test('delete project', async () => {
    await request(app)
      .delete(`/admin/projects/${projId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204);
    const after = await Project.findById(projId);
    expect(after).toBeNull();
  });
});

describe('Skill CRUD', () => {
  let skillId;
  test('create skill', async () => {
    const res = await request(app)
      .post('/admin/skills')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'JavaScript', proficiency: 95 })
      .expect(201);
    skillId = res.body._id;
    expect(res.body.name).toBe('JavaScript');
  });

  test('list skills', async () => {
    const res = await request(app)
      .get('/admin/skills')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body.some(s => s._id === skillId)).toBe(true);
  });

  test('update skill', async () => {
    const res = await request(app)
      .put(`/admin/skills/${skillId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ proficiency: 100 })
      .expect(200);
    expect(res.body.proficiency).toBe(100);
  });

  test('delete skill', async () => {
    await request(app)
      .delete(`/admin/skills/${skillId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204);
    const after = await Skill.findById(skillId);
    expect(after).toBeNull();
  });
});

describe('Contact messages', () => {
  test('list contacts (empty)', async () => {
    const res = await request(app)
      .get('/admin/contacts')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
