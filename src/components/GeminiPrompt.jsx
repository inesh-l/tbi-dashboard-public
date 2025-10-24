import { generateText } from "../lib/llm.js";
import { error2019 } from "../data/2019error.js";

export const GeminiPrompt = ({ year }) => {

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
            // Append the 2019 error message if the year is 2019
            let finalPrompt = prompt;
            if (year === "2019" || year === 2019) {
                finalPrompt = prompt + "\n\nIMPORTANT NOTE: " + error2019;
            }

            // Call the function to generate text with the API key
            const response = await generateText(finalPrompt, apiKey);

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