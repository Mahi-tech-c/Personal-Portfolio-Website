// Re-export from adapter (NeDB-based, Mongoose-compatible API)
const { Project } = require('../db/adapter');
module.exports = Project;
