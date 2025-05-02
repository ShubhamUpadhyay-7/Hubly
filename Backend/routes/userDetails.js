
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const bcrypt = require('bcrypt');


router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.put("/update", authMiddleware, async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        const updates = { name, phone, email };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: updates },
            { new: true }
        ).select("-password");

        res.json({ message: "Profile updated", user: updatedUser });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

const CommonPassword = require("../models/CommonPassword");


router.put("/common-password", authMiddleware, async (req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        let existing = await CommonPassword.findOne();

        if (existing) {
            existing.password = hashedPassword;
            existing.updatedAt = Date.now();
            await existing.save();
        } else {
            await CommonPassword.create({ password: hashedPassword });
        }

        res.json({ message: "Common password updated" });
    } catch (err) {
        console.error("Common password update error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

module.exports = router;