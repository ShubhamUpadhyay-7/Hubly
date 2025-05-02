const mongoose = require('mongoose');

const commonPasswordSchema = new mongoose.Schema({
    password: String,
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommonPassword', commonPasswordSchema);
