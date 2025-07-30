import { createContext, useState } from "react";
import main from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompt, setPrevPrompt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const delayPara = (index, nextChar, isLast) => {
        setTimeout(function () {
            setResultData(prev => prev + nextChar);
        }, 10 * index);
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let chunk;
        if (prompt !== undefined) {
            chunk = await main(prompt)
            setRecentPrompt(prompt)
        }
        else {
            setPrevPrompt(prev => [...prev, input])
            setRecentPrompt(input)
            chunk = await main(input)
        }

        // Format markdown
        let formatted = chunk
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
            .replace(/###\s?(.*?)\s*:?(\n|$)/g, "<h3>$1</h3><br>")
            .replace(/:\s?/g, ":<br>")
            .replace(/\*/g, "<br>");

        // Simulate typing effect character by character
        for (let i = 0; i < formatted.length; i++) {
            delayPara(i, formatted[i]);
        }

        setLoading(false);
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
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;

