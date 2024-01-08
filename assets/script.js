/* add API KEY */
function buildQueryURL(city, type) {
    let baseURL = "https://api.openweathermap.org/data/2.5/";
    return `${baseURL}${type}?q=${city}&appid=${owmAPI}&units=imperial`;
}

function getCurrentWeather(city) {
    let queryURL = buildQueryURL(city, "weather");
    fetch(queryURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayFiveDayForecast(data) {
    let forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; 

    const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.endsWith('12:00:00'));

    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const temp = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

        forecastContainer.innerHTML += `
            <div class="forecast-item card">
                <h5>${date.toDateString()}</h5>
                <img src="${iconUrl}" alt="Weather Icon">
                <p>Temp: ${temp} °F</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind: ${windSpeed} mph</p>
            </div>
        `;
    });
}

function getFiveDayForecast(city) {
    let queryURL = buildQueryURL(city, "forecast");
    fetch(queryURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayFiveDayForecast(data);
        })
        .catch(error => console.error('Error:', error));
}
document.getElementById('search-button').addEventListener('click', (event) => {
    event.preventDefault();
    let city = document.getElementById('city-search').value; 
    if (city) {
        addCityToList(city);
    }
    saveCity(city);
    getCurrentWeather(city);
    getFiveDayForecast(city);
});

function addCityToList(city) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = city;
    historyList.appendChild(listItem);
}


function displayCurrentWeather(data) {
    let weatherContainer = document.getElementById('current-weather');
    let date = new Date(data.dt * 1000).toDateString(); 

    let iconCode = data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    weatherContainer.innerHTML = `
        <h3><img src="${iconUrl}" alt="Weather icon">  ${data.name} (${date})</h3>
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
    `;
}



function saveCity(city) {
    localStorage.setItem('lastCity', city);
}

document.getElementById('search-button').addEventListener('click', (event) => {
    event.preventDefault();
    let city = document.getElementById('city-search').value; 
    saveCity(city);
    getCurrentWeather(city);
    getFiveDayForecast(city);
});

window.onload = () => {
    let lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        document.getElementById('city-search').value = lastCity; 
        getCurrentWeather(lastCity);
        getFiveDayForecast(lastCity);
    }
};

