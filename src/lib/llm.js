import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "../data/systemPrompt.js";

export const generateText = async (prompt, apiKey) => {
    if (!apiKey) {
        throw new Error("Please provide a Google API key");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Set the system instruction during model initialization
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}