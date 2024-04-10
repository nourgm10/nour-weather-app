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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="day-1">
          <div class="forecast-day">${day}</div>
          <img
            src="https://img.icons8.com/ios/250/000000/sun.png"
            alt=""
            width="36"
            class="forecast-icon"
          />
          <div class="forecast-temperature">
            <div>
              <span class="min-max-forecast">min </span
              ><span id="min-forecast-temperature">8°C</span>
            </div>
            <div>
              <span class="min-max-forecast">max </span
              ><span id="max-forecast-temperature">17°C</span>
            </div>
          </div>
        </div>`;
  });

  forecastElement.innerHTML = forecastHtml;
}

searchCity("Paris");
displayForecast();
