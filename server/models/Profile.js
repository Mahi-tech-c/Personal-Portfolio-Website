// Re-export from adapter (NeDB-based, Mongoose-compatible API)
const { Profile } = require('../db/adapter');
module.exports = Profile;
