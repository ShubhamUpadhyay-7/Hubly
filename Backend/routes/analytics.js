
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const authenticateJWT = require('../middleware/auth');

router.get('/analytics', authenticateJWT, async (req, res) => {
    try {
        const tickets = await Ticket.find().lean();

        let totalChats = tickets.length;
        let resolvedTickets = 0;
        let missedChats = 0;
        let totalReplyTime = 0;
        let replyCount = 0;

        tickets.forEach(ticket => {
            if (ticket.status === 'resolved') resolvedTickets++;

            const msgs = ticket.messages;
            const customerMsg = msgs.find(m => m.sender === 'Customer');
            const adminMsg = msgs.find(m => m.sender === 'Admin');

            if (!adminMsg) missedChats++;

            if (customerMsg && adminMsg) {
                const diff = new Date(adminMsg.timestamp) - new Date(customerMsg.timestamp);
                if (diff >= 0) {
                    totalReplyTime += diff;
                    replyCount++;
                }
            }
        });

        const avgReplyTime = replyCount > 0 ? (totalReplyTime / replyCount) / 1000 : 0; // in seconds

        res.json({
            totalChats,
            resolvedTickets,
            missedChats,
            averageReplyTime: avgReplyTime.toFixed(2) + ' sec'
        });

    } catch (err) {
        console.error('Error fetching analytics:', err);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

module.exports = router;
