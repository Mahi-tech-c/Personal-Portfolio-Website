// Database configuration
// Using NeDB (file-based, no MongoDB server required)
// For production, swap this adapter with real Mongoose/MongoDB

const connectDB = async () => {
    // NeDB initializes automatically via the adapter
    // No external connection needed
    console.log('✅ Database ready (NeDB file-based)');
};

module.exports = connectDB;
