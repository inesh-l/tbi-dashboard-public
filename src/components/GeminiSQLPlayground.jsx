import { generateText } from "../lib/llm.js";
import { error2019 } from "../data/2019error.js";

export const GeminiSQLPlayground = ({ year, db }) => {

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

    // Handles executing SQL queries
    const handleExecuteSQL = async () => {
        const sqlQuery = document.getElementById('sqlInput').value;
        
        if (!sqlQuery) {
            alert("Please enter a SQL query.");
            return;
        }

        // Use the database from either prop or global window object
        const database = db;
        
        if (!database) {
            document.getElementById('sqlOutput').innerHTML = '<p style="color: orange;">⚠️ Please upload a CSV file first to enable the database connection.</p>';
            return;
        }

        try {
            // Execute the SQL and normalize the result into an array of row objects.
            const rawResult = await database.sql([sqlQuery]);

            // Helper: convert different duckdb/duckdb-wasm result shapes into rows array
            let rows = [];

            // If it's already an array of plain objects (rows)
            if (Array.isArray(rawResult) && rawResult.length > 0 && typeof rawResult[0] === 'object' && !rawResult[0].columns) {
                rows = rawResult;
            }
            // If it's an array wrapper where the first entry is a result-like object with toArray()
            else if (Array.isArray(rawResult) && rawResult.length === 1 && rawResult[0] && typeof rawResult[0].toArray === 'function') {
                rows = rawResult[0].toArray();
            }
            // If it has a toArray() method (duckdb result object)
            else if (rawResult && typeof rawResult.toArray === 'function') {
                rows = rawResult.toArray();
            }
            // If it exposes a `columns` array ({ columns: [{ name, data: [...] }, ...] })
            else if (rawResult && Array.isArray(rawResult.columns)) {
                const cols = rawResult.columns;
                const length = (cols[0] && Array.isArray(cols[0].data)) ? cols[0].data.length : 0;
                for (let i = 0; i < length; i++) {
                    const row = {};
                    cols.forEach(col => {
                        row[col.name] = (col.data && col.data[i] !== undefined) ? col.data[i] : null;
                    });
                    rows.push(row);
                }
            }
            // Fallback: if result has `data` (array of arrays) and `columns` (names)
            else if (rawResult && Array.isArray(rawResult.data) && Array.isArray(rawResult.columns)) {
                rawResult.data.forEach(r => {
                    const row = {};
                    rawResult.columns.forEach((c, idx) => {
                        row[c] = r[idx];
                    });
                    rows.push(row);
                });
            }

            // Create a simple table display for the results
            const resultContainer = document.getElementById('sqlOutput');

            if (rows && rows.length > 0) {
                // Create table
                let tableHTML = '<table style="border-collapse: collapse; width: 100%; margin-top: 10px;">';
                // Add headers
                const headers = Object.keys(rows[0]);
                tableHTML += '<tr style="background-color: #f2f2f2;">';
                headers.forEach(header => {
                    tableHTML += `<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${header}</th>`;
                });
                tableHTML += '</tr>';

                // Add rows (limit to first 50 rows for performance)
                const displayRows = rows.slice(0, 50);
                displayRows.forEach(row => {
                    tableHTML += '<tr>';
                    headers.forEach(header => {
                        const cell = row[header] === null || row[header] === undefined ? '' : row[header];
                        tableHTML += `<td style="border: 1px solid #ddd; padding: 8px;">${cell}</td>`;
                    });
                    tableHTML += '</tr>';
                });

                tableHTML += '</table>';

                if (rows.length > 50) {
                    tableHTML += `<p style="margin-top: 10px; font-style: italic;">Showing first 50 of ${rows.length} rows</p>`;
                }

                resultContainer.innerHTML = tableHTML;
            } else {
                resultContainer.innerHTML = '<p>Query executed successfully. No results to display.</p>';
            }

        } catch (error) {
            document.getElementById('sqlOutput').innerHTML = `<p style="color: red;">SQL Error: ${error.message}</p>`;
        }
    };

    // Handle clearing SQL output
    const handleClearSQL = () => {
        document.getElementById('sqlOutput').innerHTML = '';
        document.getElementById('sqlInput').value = '';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            {/* Gemini AI Section */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h2>AI Assistant</h2>
                
                {/* Input box for the API key */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
                    <label htmlFor="apiKeyInput">Gemini API Key:</label>
                    <input
                        id="apiKeyInput"
                        type="password"
                        placeholder="Enter your Gemini API key"
                        style={{ width: '70%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                {/* Input box for the prompt */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
                    <label htmlFor="promptInput">Ask the AI about your data:</label>
                    <textarea
                        id="promptInput"
                        placeholder="Enter your question here (e.g., 'What is the prevalence of TBI in males aged 25-35?')"
                        rows={5}
                        style={{ width: '70%', resize: 'vertical', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <button 
                    onClick={handleSendPrompt} 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#007cba', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        marginBottom: '10px'
                    }}
                >
                    Ask AI
                </button>

                {/* AI Response Output */}
                <div 
                    id="responseOutput" 
                    style={{ 
                        minHeight: '100px', 
                        padding: '10px', 
                        border: '1px solid #eee', 
                        backgroundColor: '#f9f9f9', 
                        borderRadius: '4px',
                        whiteSpace: 'pre-wrap'
                    }}
                >
                    AI responses will appear here...
                </div>
            </div>

            {/* SQL Playground Section */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h2>SQL Playground</h2>
                
                {/* SQL Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
                    <label htmlFor="sqlInput">SQL Query:</label>
                    <textarea
                        id="sqlInput"
                        placeholder="Enter your SQL query here (e.g., SELECT * FROM brfss LIMIT 10)"
                        rows={8}
                        style={{ 
                            width: '100%', 
                            resize: 'vertical', 
                            padding: '8px', 
                            border: '1px solid #ccc', 
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button 
                        onClick={handleExecuteSQL} 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer'
                        }}
                    >
                        Execute Query
                    </button>
                    
                    <button 
                        onClick={handleClearSQL} 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: '#6c757d', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer'
                        }}
                    >
                        Clear
                    </button>
                </div>

                {/* SQL Results Output */}
                <div 
                    id="sqlOutput" 
                    style={{ 
                        minHeight: '200px', 
                        padding: '10px', 
                        border: '1px solid #eee', 
                        backgroundColor: '#f9f9f9', 
                        borderRadius: '4px',
                        overflowX: 'auto'
                    }}
                >
                    📊 SQL results will appear here...<br/>
                    💡 <strong>Tip:</strong> Make sure to upload a CSV file first to create the "brfss" table.
                </div>
            </div>

            {/* Quick SQL Examples */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                <h3>Quick SQL Examples</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
                    <button 
                        onClick={() => document.getElementById('sqlInput').value = 'SELECT * FROM brfss LIMIT 10'}
                        style={{ padding: '8px', textAlign: 'left', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        View first 10 rows
                    </button>
                    <button 
                        onClick={() => document.getElementById('sqlInput').value = 'SELECT COUNT(*) as total_records FROM brfss'}
                        style={{ padding: '8px', textAlign: 'left', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Count total records
                    </button>
                    <button 
                        onClick={() => document.getElementById('sqlInput').value = 'SELECT SEXVAR, COUNT(*) as count FROM brfss GROUP BY SEXVAR'}
                        style={{ padding: '8px', textAlign: 'left', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Count by gender
                    </button>
                    <button 
                        onClick={() => document.getElementById('sqlInput').value = 'SELECT OH8_1, COUNT(*) as count FROM brfss WHERE OH8_1 IS NOT NULL GROUP BY OH8_1'}
                        style={{ padding: '8px', textAlign: 'left', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        TBI Q1 responses
                    </button>
                </div>
            </div>
        </div>
    );
};