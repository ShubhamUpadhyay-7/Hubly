
const User = require('../models/User');
const express = require("express");
const router = express.Router();
const CommonPassword = require('../models/CommonPassword');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';


router.post("/signup", async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        const userCount = await User.countDocuments();

        const role = userCount === 0 ? 'Super Admin' : 'Admin';

        const user = new User({
            name,
            phone,
            email,
            role
        });
        await user.save();


        if (userCount === 0) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await new CommonPassword({ password: hashedPassword }).save();
        }


        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: `${role} registered successfully`,
            user: { email, role },
            token
        });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
