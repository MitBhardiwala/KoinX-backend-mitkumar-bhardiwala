require('dotenv').config();
const { fetchAndStoreCryptoPrices } = require('../services/cryptoService');
const connectDB = require('../config/database');

// Change to CommonJS export for Vercel
module.exports = async function handler(req, res) {
    // Verify the request is from Vercel's cron job
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Connect to MongoDB
        await connectDB();

        // Run the price update
        await fetchAndStoreCryptoPrices();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Cron job failed:', error);
        res.status(500).json({ error: 'Failed to update crypto prices' });
    }
} 