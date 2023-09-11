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

function formatDay(timestamp){
  let date= new Date(timestamp * 1000);
  let day= date.getDay();
  let days= ["Sun","Mon","Tue","Wed","Thu", "Fri", "Sat"];
  return days[day];

}
function displayForecast(response){
  let forecast=response.data.daily;

  let forecastElement= document.querySelector("#forecast");

 let forecastHTML= `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if(index < 6){
    
     forecastHTML= 
     forecastHTML + `  <div class="col-2">
       <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
       
        <img 
        src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/>  

       <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
         <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
         </div>  
         </div>
               `;
              }
            });
            forecastHTML= forecastHTML+ `</div>`;
            forecastElement.innerHTML=forecastHTML;
 }

  function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


//const axios = require("axios/dist/browser/axios.cjs"); // browser commonJS bundle (ES2017)
 //const axios = require('axios/dist/node/axios.cjs'); // node commonJS bundle (ES2017)

let form = document.querySelector("#search-city");
form.addEventListener("submit", getCity);

function searchCity(city) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
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
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#hum").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed);
 
  let celsiusTemperature = response.data.main.temp;
 let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let iconElement= document.querySelector("#icon");

iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}









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
displayForecast();
