// server.js

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // For hosting platforms

// Add CORS for Telegram
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://web.telegram.org');
  next();
});

// Move API key to .env file
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// Add to server.js after API key declaration
console.log('API Key loaded:', WEATHER_API_KEY ? 'Yes (length: ' + WEATHER_API_KEY.length + ')' : 'No');

app.use(express.static('public'));

// Test endpoint to check if API key is working
app.get('/api/test', async (req, res) => {
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: 'London',
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Weather endpoint
app.get('/api/weather/:city', async (req, res) => {
    const city = req.params.city;
    console.log('Fetching weather for:', city);
    
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });
        console.log('API Response:', response.data);
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
