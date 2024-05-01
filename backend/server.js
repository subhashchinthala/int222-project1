const express = require('express');
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 5000;




// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "frontend")));


app.get("/", (req, res) => {
    let path = "C:/Users/varshith/OneDrive/Desktop/Weather App/frontend/weather.html";
    res.sendFile(path);
});





// API routes
app.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;
    try {
        const weatherData = await Weather.findOne({ city });
        res.json(weatherData);
    } catch (err) {
        console.error('Error retrieving weather data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/weather', async (req, res) => {
    const { city, icon, description, temp, humidity, windSpeed } = req.body;
    try {
        const newWeatherData = new Weather({
            city,
            icon,
            description,
            temp,
            humidity,
            windSpeed
        });
        await newWeatherData.save();
        res.status(201).json(newWeatherData);
    } catch (err) {
        console.error('Error saving weather data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});

