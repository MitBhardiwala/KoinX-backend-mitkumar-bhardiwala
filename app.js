require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cryptoStatsRouter = require('./routes/cryptoStats');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use the crypto stats routes
app.use('/crypto-stats', cryptoStatsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 