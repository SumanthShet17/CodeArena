const { GoogleGenAI } = require("@google/genai");


const solveDoubt = async(req , res)=>{


    try {
        const { messages, title, description, testCases, startCode } = req.body;
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

        // Build the system instruction once
        const systemInstruction = `
You are an expert Data Structures and Algorithms (DSA) tutor specializing in helping users solve coding problems. Your role is strictly limited to DSA-related assistance only.

## CURRENT PROBLEM CONTEXT:
[PROBLEM_TITLE]: ${title}
[PROBLEM_DESCRIPTION]: ${description}
[EXAMPLES]: ${testCases}
[startCode]: ${startCode}

... (instructions trimmed for brevity) ...
`;

        // Call the API and await its result so errors are caught by the outer try/catch
        let response;
        try {
            response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: messages,
                config: { systemInstruction }
            });
        } catch (apiErr) {
            console.error('GenAI API error:', apiErr);
            // If the library provides structured error info, include it for easier debugging
            const message = apiErr.message || 'GenAI API request failed';
            return res.status(502).json({ message, detail: apiErr.toString() });
        }

        // Respond with the AI text (library exposes `text` in previous usage)
        const text = response && response.text ? response.text : JSON.stringify(response);
        console.log('GenAI response text:', text);
        return res.status(201).json({ message: text });
    } catch (err) {
        console.error('solveDoubt error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

module.exports = solveDoubt;
