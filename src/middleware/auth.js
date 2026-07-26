const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to protect admin routes
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload; // attach user payload to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
