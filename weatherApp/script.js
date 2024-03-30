const apiKey = '774b299815980323c43f6a251f917ff8'; // Your OpenWeatherMap API Key
const city = 'Calgary';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
        document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

fetchWeather();
