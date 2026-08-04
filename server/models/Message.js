// Re-export from adapter (NeDB-based, Mongoose-compatible API)
const { Message } = require('../db/adapter');
module.exports = Message;
