// api/index.js – Vercel serverless entry point
const serverless = require('serverless-http');
const app = require('../src/app'); // Express app with routes & middleware
module.exports = serverless(app);
