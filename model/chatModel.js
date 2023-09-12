const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userMessage: {
    role: String,
    content: String,
  },
  aiResponse: {
    role: String,
    content: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Conversation', conversationSchema);
