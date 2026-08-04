const Datastore = require('nedb-promises');
const bcrypt = require('bcryptjs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

// Create datastores for each model
const stores = {
    users: Datastore.create({ filename: path.join(dataDir, 'users.db'), autoload: true }),
    profiles: Datastore.create({ filename: path.join(dataDir, 'profiles.db'), autoload: true }),
    projects: Datastore.create({ filename: path.join(dataDir, 'projects.db'), autoload: true }),
    skills: Datastore.create({ filename: path.join(dataDir, 'skills.db'), autoload: true }),
    certificates: Datastore.create({ filename: path.join(dataDir, 'certificates.db'), autoload: true }),
    achievements: Datastore.create({ filename: path.join(dataDir, 'achievements.db'), autoload: true }),
    messages: Datastore.create({ filename: path.join(dataDir, 'messages.db'), autoload: true })
};

// Helper to add timestamps
const withTimestamps = (doc) => {
    const now = new Date().toISOString();
    return { ...doc, createdAt: doc.createdAt || now, updatedAt: now };
};

// Generate ID
const genId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// =============================================
// Model wrappers that mimic Mongoose API
// =============================================

const User = {
    async create(data) {
        if (data.password) {
            const salt = await bcrypt.genSalt(12);
            data.password = await bcrypt.hash(data.password, salt);
        }
        data._id = data._id || genId();
        data.role = data.role || 'user';
        const doc = withTimestamps(data);
        await stores.users.insert(doc);
        return {
            ...doc,
            async comparePassword(candidate) {
                return bcrypt.compare(candidate, doc.password);
            }
        };
    },
    async findOne(query = {}) {
        const doc = await stores.users.findOne(query);
        if (!doc) return null;
        return {
            ...doc,
            async comparePassword(candidate) {
                return bcrypt.compare(candidate, doc.password);
            }
        };
    },
    async findById(id) {
        return stores.users.findOne({ _id: id });
    },
    async find(query = {}) {
        return stores.users.find(query);
    }
};

const Profile = {
    async create(data) {
        data._id = data._id || genId();
        const doc = withTimestamps(data);
        return stores.profiles.insert(doc);
    },
    async findOne(query = {}) {
        return stores.profiles.findOne(query);
    },
    async findById(id) {
        return stores.profiles.findOne({ _id: id });
    },
    async findByIdAndUpdate(id, update) {
        const existing = await stores.profiles.findOne({ _id: id });
        if (!existing) return null;
        const updated = { ...existing, ...update, _id: id, updatedAt: new Date().toISOString() };
        await stores.profiles.update({ _id: id }, updated);
        return updated;
    }
};

const Project = {
    async create(data) {
        data._id = data._id || genId();
        data.featured = data.featured || false;
        data.status = data.status || 'completed';
        data.technologies = data.technologies || [];
        const doc = withTimestamps(data);
        return stores.projects.insert(doc);
    },
    async find(query = {}) {
        return stores.projects.find(query);
    },
    async findById(id) {
        return stores.projects.findOne({ _id: id });
    },
    async findByIdAndUpdate(id, update) {
        const existing = await stores.projects.findOne({ _id: id });
        if (!existing) return null;
        const updated = { ...existing, ...update, _id: id, updatedAt: new Date().toISOString() };
        await stores.projects.update({ _id: id }, updated);
        return updated;
    },
    async findByIdAndDelete(id) {
        const doc = await stores.projects.findOne({ _id: id });
        if (!doc) return null;
        await stores.projects.remove({ _id: id });
        return doc;
    },
    async countDocuments(query = {}) {
        return stores.projects.count(query);
    },
    async insertMany(docs) {
        const enriched = docs.map(d => {
            d._id = d._id || genId();
            return withTimestamps(d);
        });
        return stores.projects.insert(enriched);
    }
};

const Skill = {
    async create(data) {
        data._id = data._id || genId();
        const doc = withTimestamps(data);
        return stores.skills.insert(doc);
    },
    async find(query = {}) {
        return stores.skills.find(query);
    },
    async findById(id) {
        return stores.skills.findOne({ _id: id });
    },
    async findByIdAndUpdate(id, update) {
        const existing = await stores.skills.findOne({ _id: id });
        if (!existing) return null;
        const updated = { ...existing, ...update, _id: id, updatedAt: new Date().toISOString() };
        await stores.skills.update({ _id: id }, updated);
        return updated;
    },
    async findByIdAndDelete(id) {
        const doc = await stores.skills.findOne({ _id: id });
        if (!doc) return null;
        await stores.skills.remove({ _id: id });
        return doc;
    },
    async insertMany(docs) {
        const enriched = docs.map(d => {
            d._id = d._id || genId();
            return withTimestamps(d);
        });
        return stores.skills.insert(enriched);
    }
};

const Certificate = {
    async create(data) {
        data._id = data._id || genId();
        const doc = withTimestamps(data);
        return stores.certificates.insert(doc);
    },
    async find(query = {}) {
        return stores.certificates.find(query);
    },
    async findById(id) {
        return stores.certificates.findOne({ _id: id });
    },
    async findByIdAndUpdate(id, update) {
        const existing = await stores.certificates.findOne({ _id: id });
        if (!existing) return null;
        const updated = { ...existing, ...update, _id: id, updatedAt: new Date().toISOString() };
        await stores.certificates.update({ _id: id }, updated);
        return updated;
    },
    async findByIdAndDelete(id) {
        const doc = await stores.certificates.findOne({ _id: id });
        if (!doc) return null;
        await stores.certificates.remove({ _id: id });
        return doc;
    },
    async insertMany(docs) {
        const enriched = docs.map(d => {
            d._id = d._id || genId();
            return withTimestamps(d);
        });
        return stores.certificates.insert(enriched);
    }
};

const Achievement = {
    async create(data) {
        data._id = data._id || genId();
        const doc = withTimestamps(data);
        return stores.achievements.insert(doc);
    },
    async find(query = {}) {
        return stores.achievements.find(query);
    },
    async findById(id) {
        return stores.achievements.findOne({ _id: id });
    },
    async findByIdAndUpdate(id, update) {
        const existing = await stores.achievements.findOne({ _id: id });
        if (!existing) return null;
        const updated = { ...existing, ...update, _id: id, updatedAt: new Date().toISOString() };
        await stores.achievements.update({ _id: id }, updated);
        return updated;
    },
    async findByIdAndDelete(id) {
        const doc = await stores.achievements.findOne({ _id: id });
        if (!doc) return null;
        await stores.achievements.remove({ _id: id });
        return doc;
    },
    async insertMany(docs) {
        const enriched = docs.map(d => {
            d._id = d._id || genId();
            return withTimestamps(d);
        });
        return stores.achievements.insert(enriched);
    }
};

const Message = {
    async create(data) {
        data._id = data._id || genId();
        data.read = data.read || false;
        const doc = withTimestamps(data);
        return stores.messages.insert(doc);
    },
    async find(query = {}) {
        return stores.messages.find(query);
    },
    async findById(id) {
        return stores.messages.findOne({ _id: id });
    },
    async findByIdAndDelete(id) {
        const doc = await stores.messages.findOne({ _id: id });
        if (!doc) return null;
        await stores.messages.remove({ _id: id });
        return doc;
    }
};

module.exports = { User, Profile, Project, Skill, Certificate, Achievement, Message, stores };
