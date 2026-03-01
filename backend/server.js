const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'LeetCode Proxy Server Running' });
});

// Proxy endpoint for LeetCode GraphQL
app.post('/api/leetcode', async (req, res) => {
    try {
        const response = await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch from LeetCode API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
