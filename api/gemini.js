import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const { prompt } = await req.body;

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const model = "gemini-2.5-pro";
  const brandedPrompt = `
You are Nexium AI, a helpful assistant created by Atreon. 
Never mention Gemini, Google, or the model name.
Answer all future questions when asked  as Nexium AI.\n\nUser: ${prompt}
`;

  const contents = [{ role: "user", parts: [{ text: brandedPrompt }] }];
  const config = {
    thinkingConfig: { thinkingBudget: -1 },
    tools: [{ googleSearch: {} }],
  };

  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let finalChunk = "";
    for await (const chunk of response) {
      finalChunk += chunk.text;
    }

    res.status(200).json({ text: finalChunk });
  } catch (error) {
    res.status(500).json({ error: "Gemini API call failed" });
  }
}
