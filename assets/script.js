document.getElementById('search-button').addEventListener('click', function() {
    const cityName = document.getElementById('city-search').value;
    fetchWeatherData(cityName);
    addToSearchHistory(cityName);
});

function fetchWeatherData(cityName) {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            // need to call another function here to fetch and display the forecast
        })
        .catch(error => console.error('Error:', error));
}

function displayCurrentWeather(data) {
    const weatherDetails = document.getElementById('current-weather-details');
    weatherDetails.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <!-- Add more details and an icon representation as needed -->
    `;
}

function addToSearchHistory(cityName) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = cityName;
    listItem.addEventListener('click', function() {
        fetchWeatherData(cityName);
    });
    historyList.appendChild(listItem);
}

// implement functions to save and load search history from localStorage
