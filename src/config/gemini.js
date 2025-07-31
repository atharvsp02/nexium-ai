const main = async (prompt) => {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    return data.text;
  } catch (err) {
    console.error("Frontend fetch error:", err);
    return "Failed to connect to AI.";
  }
};

export default main;
