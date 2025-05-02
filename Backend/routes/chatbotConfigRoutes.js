
const express = require('express');
const router = express.Router();
const ChatbotConfig = require('../models/ChatbotConfig.js');
const authenticateJWT = require('../middleware/auth'); // JWT middleware


router.get('/', async (req, res) => {
    try {
        let config = await ChatbotConfig.findById('chatbot-config');
        if (!config) {
            config = await ChatbotConfig.create({});
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/', authenticateJWT, async (req, res) => {
    try {
        const { headerColor, backgroundColor, messages, formPlaceholders, welcomeMessage } = req.body;

        const updatedConfig = await ChatbotConfig.findByIdAndUpdate(
            'chatbot-config',
            { headerColor, backgroundColor, messages, formPlaceholders, welcomeMessage },
            { new: true, upsert: true }
        );

        res.json(updatedConfig);
    } catch (error) {
        console.error("Error updating chatbot config:", error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
