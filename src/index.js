require('dotenv').config();
const cron = require('node-cron');
const connectDB = require('./config/database');
const { fetchAndStoreCryptoPrices } = require('./services/cryptoService');

// Connect to MongoDB
connectDB();

// Schedule the job to run every 2 hours
cron.schedule('1 * * * *', async () => {
    console.log('Running crypto price update job...');
    await fetchAndStoreCryptoPrices();
});

// Run immediately on startup
fetchAndStoreCryptoPrices();

console.log('Crypto price monitoring service started'); 