const { fetchAndStoreCryptoPrices } = require('../services/cryptoService');

export default async function handler(req, res) {
    try {
        await fetchAndStoreCryptoPrices();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Cron job failed:', error);
        res.status(500).json({ error: 'Failed to update crypto prices' });
    }
} 