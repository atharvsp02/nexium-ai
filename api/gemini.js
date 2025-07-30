import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    const { prompt, isFirstMessage } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const tools = [
      {
        googleSearch: {},
      },
    ];

    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      tools,
    };

    const model = "gemini-2.5-pro";

    const brandedIntro = `
You are Nexium AI, a helpful assistant created by Atreon. 
Never mention Gemini, Google, or the model name. 
Answer all future questions as Nexium AI.
`;

    const brandedPrompt = isFirstMessage
      ? `${brandedIntro}\n\n${prompt}\n\nPlease respond appropriately.`
      : prompt;

    const contents = [
      {
        role: "user",
        parts: [{ text: brandedPrompt }],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const output = response.response.text();
    res.status(200).json({ message: output });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}
