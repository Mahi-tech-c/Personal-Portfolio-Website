// Re-export from adapter (NeDB-based, Mongoose-compatible API)
const { User } = require('../db/adapter');
module.exports = User;
