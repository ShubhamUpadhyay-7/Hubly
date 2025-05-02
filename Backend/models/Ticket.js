const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: String, enum: ['Customer', 'Admin'] },
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const ticketSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // SuperAdmin by default
    messages: [messageSchema],
    status: { type: String, enum: ['resolved', 'unresolved'], default: 'unresolved' }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
