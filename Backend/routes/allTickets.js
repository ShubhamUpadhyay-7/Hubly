
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const authenticateJWT = require("../middleware/auth"); // adjust the path if needed

router.get("/assigned/:email", authenticateJWT, async (req, res) => {
    try {
        const { email } = req.params;
        const requester = req.user;

        if (requester.email !== email && requester.role !== "Admin" && requester.role !== "Super Admin") {
            return res.status(403).json({ message: "Access denied." });
        }

        const admin = await User.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const tickets = await Ticket.find({ assignedTo: admin._id })
            .populate("customer", "name email phone")
            .populate("assignedTo", "name email role");

        res.status(200).json({ tickets });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
