
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");


router.post("/send", async (req, res) => {
    const { ticketId, sender, content } = req.body;

    if (!ticketId || !sender || !content) {
        return res.status(400).json({ error: "ticketId, sender, and content are required." });
    }

    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        const newMessage = {
            sender,
            content,
            timestamp: new Date(),
        };

        ticket.messages.push(newMessage);
        await ticket.save();

        res.status(200).json({ success: true, newMessage });
    } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
