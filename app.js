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

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

const PORT = process.env.PORT || 3000;

// Change the listen block to only run when not in Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Make sure to export the app
module.exports = app; 