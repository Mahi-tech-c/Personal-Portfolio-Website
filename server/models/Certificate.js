// Re-export from adapter (NeDB-based, Mongoose-compatible API)
const { Certificate } = require('../db/adapter');
module.exports = Certificate;
