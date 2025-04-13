import { generateText } from "../lib/llm.js";

export const GeminiPrompt = () => {

    // Handles sending the prompt to the API
    const handleSendPrompt = async () => {
        const prompt = document.getElementById('promptInput').value;

        if (!prompt) {
            alert("Please enter a prompt.");
            return;
        }

        // Call the function to generate text
        const response = await generateText(prompt);

        // Output the response
        document.getElementById('responseOutput').innerText = 'Response: ' + response;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <h1>LLM Input</h1>

            {/* Input box for the prompt */}
            <textarea
                id="promptInput"
                placeholder="Enter prompt here"
                rows={10}
                style={{ width: '70%', resize: 'vertical' }}
            />

            <button onClick={handleSendPrompt} style={{ alignSelf: 'flex-start' }}>
                Send Prompt
            </button>

            {/* Output the response or error */}
            <div id="responseOutput"></div>
        </div>
    );
};