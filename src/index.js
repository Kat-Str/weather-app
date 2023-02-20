//feature 1

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${hour}:${minutes}`;

//feature 2

let formCity = document.querySelector("#form-city");
let searchEngine = document.querySelector("#search-engine");
let cityName = document.querySelector("#displayed-city");

formCity.addEventListener("submit", displayCity);

function displayCity(event) {
  event.preventDefault();
  if (searchEngine.value !== "") {
    cityName.innerHTML = searchEngine.value;
  }
}

//feature 3
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let displayedTemperature = document.querySelector("#tepm-display");

let cTemp = 7;

celsius.addEventListener("click", convertToCelsius);
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  displayedTemperature.innerHTML = cTemp;
}
function convertToFahrenheit(event) {
  event.preventDefault();
  displayedTemperature.innerHTML = fTemp;
}

function celsiusToFahrenheit(celsius) {
  let changedTemp = celsius * (9 / 5) + 32;
  return Math.round(changedTemp);
}
let fTemp = celsiusToFahrenheit(cTemp);
