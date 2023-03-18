//real time

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

let formattedMinutes = String(minutes).padStart(2, "0");

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${hour}:${formattedMinutes}`;

//city and temperature

let displayedTemperature = document.querySelector("#tepm-display");
let formCity = document.querySelector("#form-city");
let searchEngine = document.querySelector("#search-engine");
let cityName = document.querySelector("#displayed-city");
let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
let weatherDescription = document.querySelector("#weather-details");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let weatherIcon = document.querySelector("#weather-icon");
let secondSection = document.querySelector("#main-display");
let weatherList = document.querySelectorAll("#weather-list");
let hiddenElements = document.querySelectorAll(".hidden");

function formatData(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecastArray = response.data.daily;
  let forecastRow = document.querySelector("#forecast-row");
  let forecastHTML = `<div class="row">`;
  forecastArray.forEach((forecastDay, index) => {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col next-day">
              <h5>${formatData(forecastDay.dt)}</h5>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="Weather emoji" width="50px"
              />
              <p class="temperature">
                <span class="max-day-temp">${Math.round(
                  forecastDay.temp.max
                )}°    </span>
                <span class="min-day-temp">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </p>
            </div>`;
    }
  });
  forecastRow.innerHTML = forecastHTML + `</div>`;
}

function getForecast(coords) {
  let apiOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiOneCall).then(showForecast);
}

function showDescription(response) {
  weatherDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  //Icon
  let weatherIconCode = response.data.weather[0].icon;
  let weatherIconLink = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  weatherIcon.setAttribute("src", weatherIconLink);
}

function showTemp(response) {
  let cTemp = response.data.main.temp;
  displayedTemperature.innerHTML = Math.round(cTemp);
  showDescription(response);
  //get coords
  getForecast(response.data.coord);
  // show hidden elements
  hiddenElements.forEach((element) => {
    element.style.display = "block";
  });
  secondSection.style.display = "inline-block";
}

function displayCity(event) {
  event.preventDefault();
  if (searchEngine.value !== "") {
    cityName.innerHTML = searchEngine.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchEngine.value}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then(showTemp)
      .catch(() => {
        cityName.innerHTML = "City not found";
        hiddenElements.forEach((element) => {
          element.style.display = "none";
        });
        secondSection.style.display = "none";
      });
    secondSection.style.display = "inline-block";
  }
}

function showDefaultCity(city = "Lublin") {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  cityName.innerHTML = city;
  axios.get(url).then(showTemp);
}

showDefaultCity();

formCity.addEventListener("submit", displayCity);

//add the button searching for the current location:
// let currentLocationButton = document.querySelector("#current-location-button");

// function showLocalWeather(response) {
//   let crTemp = response.data.current.temp;
//   let crDesc = response.data.current.weather[0].description;
//   displayedTemperature.innerHTML = Math.round(crTemp);
//   weatherDescription.innerHTML = crDesc;
// }

// function getPosition(position) {
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;

//   let currentLocationApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;
//   axios.get(currentLocationApi).then(showLocalWeather);
// }

// currentLocationButton.addEventListener("click", () => {
//   navigator.geolocation.getCurrentPosition(getPosition);
// });
