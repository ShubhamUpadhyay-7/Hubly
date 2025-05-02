
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateJWT = require("../middleware/auth");


router.get("/allUsers", authenticateJWT, async (req, res) => {
    try {
        const users = await User.find().select("-__v");

        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
