import { GoogleGenerativeAI } from "../../_node/@google/generative-ai@0.21.0/index.70fdb90d.js";
import { systemPrompt } from "../data/systemPrompt.2031514a.js";
import { geminiKey } from "./geminiKey.b681c666.js";

if (!geminiKey) {
    throw new Error("Please provide a Google API key");
}

const genAI = new GoogleGenerativeAI(geminiKey);

// Set the system instruction during model initialization
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
});

export const generateText = async (prompt) => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}