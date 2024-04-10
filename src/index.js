function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-degrees");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date();
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city.toUpperCase();
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2dbe7af4434o3f6bf61f8t7c0caf3496";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "2dbe7af4434o3f6bf61f8t7c0caf3496";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if ((index > 0) & (index < 6)) {
      forecastHtml =
        forecastHtml +
        `
<div class="day-1">
          <div class="forecast-day">${formatDay(day.time)}</div>
          <img
            src="${day.condition.icon_url}"
            alt=""
            class="forecast-icon"
          />
          <div class="forecast-temperature">
            <div>
              <span class="min-max-forecast">min </span
              ><span id="min-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°C</span>
            </div>
            <div>
              <span class="min-max-forecast">max </span
              ><span id="max-forecast-temperature">${Math.round(
                day.temperature.maximum
              )}°C</span>
            </div>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
