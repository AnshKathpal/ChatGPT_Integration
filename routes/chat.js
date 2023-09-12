const express = require("express");
const chatRoute = express.Router();
const chatModel = require("../model/chatModel");
const axios = require("axios"); // Import the Axios library

require("dotenv").config();

const apiKey = process.env.MY_OPENAI_API;
const openaiEndpoint = "https://api.openai.com/v1/engines/text-davinci-003/completions";

chatRoute.post("/chat", async (req, res) => {
  const userMessage = req.body.msg;

  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        prompt: `${userMessage}.`,
        max_tokens: 100,
        temperature: 0,
        n: 1
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].text;

    const newConversation = new chatModel({
      userMessage: {
        role: "user",
        content: userMessage,
      },
      aiResponse: {
        role: "AI",
        content: aiResponse,
      },
    });

    await newConversation.save();
    res.send(aiResponse);
  } catch (error) {
    console.error("Error saving conversation:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { chatRoute };
