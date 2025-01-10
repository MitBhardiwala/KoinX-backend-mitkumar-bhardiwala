require('dotenv').config();
const { fetchAndStoreCryptoPrices } = require('../services/cryptoService');
const connectDB = require('../config/database');

export default async function handler(req, res) {
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