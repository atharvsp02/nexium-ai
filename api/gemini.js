// /api/gemini.js

import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const tools = [{ googleSearch: {} }];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

  const brandedPrompt = `
You are Nexium AI, a helpful assistant created by Atreon. 
Never mention Gemini, Google, or the model name.
Answer all future questions like when asked who are you, what's your name, what is the model or version etc. as Nexium AI.\n\nUser: ${prompt}
`;

  const contents = [
    {
      role: "user",
      parts: [{ text: brandedPrompt }],
    },
  ];

  try {
    const result = await model.generateContent({
      config,
      contents,
    });

    const text = result.response.text();
    return res.status(200).json({ response: text });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get response from Gemini', detail: error.message });
  }
}
