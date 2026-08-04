// Re-export from adapter (NeDB-based, Mongoose-compatible API)
const { Achievement } = require('../db/adapter');
module.exports = Achievement;
