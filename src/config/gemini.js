async function main(prompt) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error("Nexium API Error: " + (error.detail || error.error));
  }

  const data = await res.json();
  return data.response;
}

export default main;
