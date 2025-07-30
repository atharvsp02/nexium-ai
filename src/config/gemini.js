async function main(prompt, isFirstMessage = false) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, isFirstMessage }),
  });

  const result = await response.json();
  return result.message;
}

export default main;
