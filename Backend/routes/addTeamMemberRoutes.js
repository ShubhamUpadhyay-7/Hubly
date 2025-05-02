const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const CommonPassword = require("../models/CommonPassword.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const authorizeAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        if (decoded.role === "Super Admin" || decoded.role === "Admin") {
            return next();
        } else {
            return res.status(403).json({ message: "Access denied. Only Admin/Super-Admin allowed." });
        }
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

router.post("/addTeamMember", authorizeAdmin, async (req, res) => {
    try {
        const { name, phone, email, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const common = await CommonPassword.findOne();
        if (!common) {
            return res.status(500).json({ message: "Default password not found. Ask super admin to set it." });
        }

        const newUser = new User({
            name,
            phone,
            email,
            password: common.password,
            role
        });

        await newUser.save();

        res.status(201).json({ message: `${role} added successfully.` });
    } catch (err) {
        console.error("Add team member error:", err);
        res.status(500).json({ message: "Server error while adding member." });
    }
});

module.exports = router;
