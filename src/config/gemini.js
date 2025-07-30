// config/gemini.js

async function main(prompt, isFirstMessage) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Gemini API call failed");
  }

  const data = await res.json();
  return data.response;
}

export default main;
