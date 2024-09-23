/*
 * @Author: Diana Tang
 * @Date: 2024-09-23 15:22:24
 * @LastEditors: Diana Tang
 * @Description: some description
 * @FilePath: /WeChat-OpenAI-English-Assistant/server/index.js
 */
// server/index.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const {OpenAI}= require('openai')
const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY,
    //记得删
   
});

const chatCompletion =openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-4o-mini",
});

const app = express();
app.use(cors());
app.use(express.json());

// 处理英语学习请求
app.post('/learn-english', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an English learning assistant.' },
        { role: 'user', content: message },
      ],
    });

    const answer = response.data.choices[0].message.content;
    res.json({ reply: answer });
  } catch (error) {
    res.status(500).json({ error: 'OpenAI API Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
