import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

async function main(prompt) {
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
  const brandedPrompt = `
You are Nexium AI, a helpful assistant created by Atreon. 
Never mention Gemini, Google, or the model name.
Answer all future questions as Nexium AI and ask that how can i help you or assist you.\n\nUser: ${prompt}
`;

  const contents = [
    {
      role: "user",
      parts: [{ text: brandedPrompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let finalChunk = ""
  for await (const chunk of response) {
    finalChunk += chunk.text
    console.log(chunk.text);
  }
  
  return finalChunk;
}

export default main;
