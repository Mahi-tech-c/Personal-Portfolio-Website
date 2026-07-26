const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongoDB connected (cached)');
  } catch (err) {
    console.error('MongoDB connection error (non-fatal):', err);
    // Do not rethrow to avoid crashing serverless function
    // The app can still run, but DB-dependent routes may fail gracefully
  }
};

module.exports = connectDB;
