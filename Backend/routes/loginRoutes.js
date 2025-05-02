
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CommonPassword = require('../models/CommonPassword');
const bcrypt = require('bcryptjs');

const JWT_SECRET = "your_secret_key";


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const commonPasswordDoc = await CommonPassword.findOne();
        if (!commonPasswordDoc) {
            return res.status(500).json({ message: "Password not configured" });
        }

        const isMatch = await bcrypt.compare(password, commonPasswordDoc.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }


        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
