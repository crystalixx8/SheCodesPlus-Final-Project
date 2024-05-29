function formatDateAndTime(date) {
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
  let hour = date.getHours();
  let min = date.getMinutes();

  if (min < 10) {
    min = `0${min}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let dayTimeFormat = `${day} ${hour}:${min}`;
  return dayTimeFormat;
}

function updateWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let currTempElement = document.querySelector(".current-temperature-value");
  let desciptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let iconElement = document.querySelector(".current-temperature-icon");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  currTempElement.innerHTML = Math.round(response.data.temperature.current);
  desciptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}"/>`;
  timeElement.innerHTML = formatDateAndTime(date)
}

function searchCity(city) {
  let key = "08dcad5234e0828f84o97f5ct047b8d4";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&unit=imperial`;

  axios.get(apiURL).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  searchCity(searchInputElement.value);
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", searchSubmit);

searchCity("Sydney");
