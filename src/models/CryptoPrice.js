const mongoose = require('mongoose');

const cryptoPriceSchema = new mongoose.Schema({
    coinId: {
        type: String,
        required: true,
    },
    priceUSD: {
        type: Number,
        required: true,
    },
    marketCapUSD: {
        type: Number,
        required: true,
    },
    priceChange24h: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('CryptoPrice', cryptoPriceSchema); 