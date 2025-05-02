
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const authenticateJWT = require("../middleware/auth");


router.get("/:ticketId", authenticateJWT, async (req, res) => {
    try {
        const { ticketId } = req.params;

        const ticket = await Ticket.findById(ticketId)
            .populate("customer", "name email phone")
            .populate("assignedTo", "name email role");

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json({ ticket });
    } catch (error) {
        console.error("Error fetching ticket:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


router.post("/:ticketId/message", authenticateJWT, async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { sender, content } = req.body;

        if (!sender || !content) {
            return res.status(400).json({ message: "Sender and content are required." });
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        ticket.messages.push({ sender, content });  // Push new message
        await ticket.save();

        res.status(200).json({ message: "Message added successfully", ticket });
    } catch (error) {
        console.error("Error adding message:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


router.patch("/:ticketId/status", authenticateJWT, async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { status } = req.body;

        if (!['resolved', 'unresolved'].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        ticket.status = status;
        await ticket.save();

        res.status(200).json({ message: `Ticket status updated to ${status}`, ticket });
    } catch (error) {
        console.error("Error updating ticket status:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


router.patch('/:ticketId/assign', authenticateJWT, async (req, res) => {
    try {
        const { assignedTo } = req.body;
        const { ticketId } = req.params;

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        // Find user by email
        const user = await User.findOne({ email: assignedTo });
        if (!user) return res.status(404).json({ message: "User not found with this email" });

        ticket.assignedTo = user._id;
        await ticket.save();

        res.json({ message: "Assigned successfully", ticket });
    } catch (error) {
        console.error("Error assigning ticket", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;

