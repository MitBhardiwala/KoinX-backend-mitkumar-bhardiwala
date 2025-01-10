const express = require('express');
const router = express.Router();
const CryptoPrice = require('../src/models/CryptoPrice');

// GET /stats endpoint
router.get('/stats', async (req, res) => {
    try {
        const { coin } = req.query;

        if (!coin) {
            return res.status(400).json({ error: 'Coin parameter is required' });
        }

        const latestData = await CryptoPrice.findOne(
            { coinId: coin.toLowerCase() }
        ).sort({ timestamp: -1 });

        if (!latestData) {
            return res.status(404).json({ error: 'Coin not found' });
        }

        // Map the field names to match the required response format
        res.json({
            price: latestData.priceUSD,
            marketCap: latestData.marketCapUSD,
            '24hChange': latestData.priceChange24h
        });

    } catch (error) {
        console.error('Error fetching crypto stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/deviation', async (req, res) => {
    try {
        const { coin } = req.query;

        if (!coin) {
            return res.status(400).json({ error: 'Coin parameter is required' });
        }

        // Get last 100 records for the specified coin
        const prices = await CryptoPrice.find({ coinId: coin })
            .sort({ timestamp: -1 })
            .limit(100)
            .select('priceUSD');

        if (prices.length === 0) {
            return res.status(404).json({ error: 'No price data found for the specified coin' });
        }

        // Extract just the prices into an array
        const priceValues = prices.map(p => p.priceUSD);

        // Calculate standard deviation
        const mean = priceValues.reduce((acc, val) => acc + val, 0) / priceValues.length;
        const squareDiffs = priceValues.map(price => Math.pow(price - mean, 2));
        const avgSquareDiff = squareDiffs.reduce((acc, val) => acc + val, 0) / squareDiffs.length;
        const standardDeviation = Math.sqrt(avgSquareDiff);

        res.json({ deviation: Number(standardDeviation.toFixed(2)) });
    } catch (error) {
        console.error('Error calculating deviation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 