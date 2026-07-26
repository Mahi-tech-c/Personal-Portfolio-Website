// api/[...path].js – Vercel catch-all serverless entry point for Express API routes
const serverless = require('serverless-http');
const app = require('../src/app');
module.exports = serverless(app);
