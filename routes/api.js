const express = require('express');
const router = express.Router();
const { generateSearchResults } = require('../config/ai-config');

router.get('/search', async (req, res) => {
    const query = req.query.q || '';
    console.log('Search query:', query);
    
    try {
        const aiResults = await generateSearchResults(query);
        res.json({
            success: true,
            query: query,
            results: aiResults.results
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            error: 'Search failed'
        });
    }
});

module.exports = router;