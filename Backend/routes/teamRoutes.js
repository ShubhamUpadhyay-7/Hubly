
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateJWT = require("../middleware/auth");


router.get("/team-members", authenticateJWT, async (req, res) => {
    try {
        const teamMembers = await User.find({
            role: { $in: ["Admin", "Member"] }
        }).select("name email role");

        res.status(200).json({ teamMembers });
    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;

