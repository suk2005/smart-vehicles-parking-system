// server/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import axios from 'axios';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          {
            role: 'system',
            content: `
You are a smart virtual assistant for the "Park Easy" website — a Smart Vehicle Parking System.

You support the following features:

- Parking Slip Booking
- Viewing Booking History
- Real-time Slot Availability
- Location Selection with Live Map
- Online Payment Processing
- Contact and Help Support
- Services Overview
- User Login and Registration

You should ONLY answer based on the actual features of the "Park Easy" app. 
If a feature is unavailable, respond: "This feature is not available right now."

Be friendly, brief, and helpful when replying.
`
          },
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.6
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ reply: answer });
  } catch (err) {
    console.error('❌ Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Error connecting to Together.ai API' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
