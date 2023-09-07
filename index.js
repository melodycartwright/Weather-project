 let h2 = document.querySelector("h2");
let now = new Date();
let hours = now.getHours();
if (hours < 10) `{ hours = 0${hours}}`;
let minutes = now.getMinutes();
if (minutes < 10) `{ minutes= 0${minutes}}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

h2.innerHTML = `${day}, ${hours}:${minutes}`;

//const axios = require("axios/dist/browser/axios.cjs"); // browser commonJS bundle (ES2017)
 //const axios = require('axios/dist/node/axios.cjs'); // node commonJS bundle (ES2017)

let form = document.querySelector("#search-city");
form.addEventListener("submit", getCity);

function searchCity(city) {
  let apiKey = "3378d2ce8663553f82fd52aa8be869a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
  let apiKey = "3378d2ce8663553f82fd52aa8be869a1";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// showWeather //
function showWeather(response) {
  document.querySelector("#cities").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#hum").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement= document.querySelector("#icon");

iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

iconElement.setAttribute("alt", response.data.weather[0].description);
}


// function from Cel to Fah //
function convertToFah(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsius = 21;
  let fahrenheit = Math.round (celsius * 9/5) + 32;
  temperatureElement.innerHTML = fahrenheit;
}

let fahConversion = document.querySelector("#fahrenheit-link");
fahConversion.addEventListener("click", convertToFah);
// function from Fah to Cel //
function convertToCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let celConversion = document.querySelector("#celsius-link");
celConversion.addEventListener("click", convertToCel);

//let cityName = "Los Angeles";
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("click", getCity);

let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Stockholm");
