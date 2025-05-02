const mongoose = require('mongoose');

const chatbotConfigSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: 'chatbot-config',
    },
    headerColor: {
        type: String,
        default: '#33475B'
    },
    backgroundColor: {
        type: String,
        default: '#EEEEEE'
    },
    messages: {
        type: [String],
        default: ["How can I help you?", "Ask me anything!"]
    },
    formPlaceholders: {
        type: Object,
        default: {
            name: "Your Name",
            phone: "+1(000)000-0000",
            email: "example@gmail.com"
        }
    },
    welcomeMessage: {
        type: String,
        default: "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way."
    }

}, { collection: 'chatbot_config' });

module.exports = mongoose.model('ChatbotConfig', chatbotConfigSchema);
