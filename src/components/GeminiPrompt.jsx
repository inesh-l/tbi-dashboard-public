import { generateText } from "../lib/llm.js";

export const GeminiPrompt = () => {

    // Handles sending the prompt to the API
    const handleSendPrompt = async () => {
        const prompt = document.getElementById('promptInput').value;
        const apiKey = document.getElementById('apiKeyInput').value;

        if (!prompt) {
            alert("Please enter a prompt.");
            return;
        }

        if (!apiKey) {
            alert("Please enter your Gemini API key.");
            return;
        }

        try {
            // Call the function to generate text with the API key
            const response = await generateText(prompt, apiKey);

            // Output the response
            document.getElementById('responseOutput').innerText = 'Response: ' + response;
        } catch (error) {
            document.getElementById('responseOutput').innerText = 'Error: ' + error.message;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <h1>LLM Input</h1>

            {/* Input box for the API key */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="apiKeyInput">Gemini API Key:</label>
                <input
                    id="apiKeyInput"
                    type="password"
                    placeholder="Enter your Gemini API key"
                    style={{ width: '70%', padding: '8px' }}
                />
            </div>

            {/* Input box for the prompt */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="promptInput">Prompt:</label>
                <textarea
                    id="promptInput"
                    placeholder="Enter prompt here"
                    rows={10}
                    style={{ width: '70%', resize: 'vertical' }}
                />
            </div>

            <button onClick={handleSendPrompt} style={{ alignSelf: 'flex-start' }}>
                Send Prompt
            </button>

            {/* Output the response or error */}
            <div id="responseOutput"></div>
        </div>
    );
};