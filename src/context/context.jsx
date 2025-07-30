import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextChar) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextChar);
        }, 10 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let currentPrompt = prompt !== undefined ? prompt : input;

        if (prompt === undefined) {
            setPrevPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
        } else {
            setRecentPrompt(prompt);
        }

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: currentPrompt }),
            });

            const data = await res.json();
            let chunk = data.response || "";

            // Markdown -> HTML formatting
            let formatted = chunk
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                .replace(/###\s?(.*?)\s*:?(\n|$)/g, "<h3>$1</h3><br>")
                .replace(/:\s?/g, ":<br>")
                .replace(/\*/g, "<br>");

            // Typing animation
            for (let i = 0; i < formatted.length; i++) {
                delayPara(i, formatted[i]);
            }
        } catch (err) {
            console.error("Error talking to Nexium API:", err);
            setResultData("❌ Error talking to Nexium AI.");
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
