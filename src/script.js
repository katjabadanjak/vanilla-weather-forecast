let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentDate.getDay()];
let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = currentDate.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let dayChange = document.querySelector("#today");
dayChange.innerHTML = `Today | ${currentDay} ${currentHour}:${currentMinutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchDefaultCity(city) {
  let apiKey = "0f955f248c77e13bb6a45d6e840419ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchDefaultCity(city);
}

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

function newWeather(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temper").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#today-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function searchLocation(position) {
  let apiKey = "0f955f248c77e13bb6a45d6e840419ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(newWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#curr-loc-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showFarenheit(event) {
  event.preventDefault();
  let Farenheit = document.querySelector("#temper");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  Farenheit.innerHTML = Math.round(farenheitTemp);
  degreesC.classList.remove("active");
  degreesF.classList.add("active");
}

let degreesF = document.querySelector("#farenheit");
degreesF.addEventListener("click", showFarenheit);

let celsiusTemperature = null;

function showCelsius(event) {
  event.preventDefault();
  let Celsius = document.querySelector("#temper");
  Celsius.innerHTML = Math.round(celsiusTemperature);
  degreesF.classList.remove("active");
  degreesC.classList.add("active");
}

let degreesC = document.querySelector("#celsius");
degreesC.addEventListener("click", showCelsius);

searchDefaultCity("London");
