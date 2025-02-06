import { CoordinatesApi } from "./coordinates-api.js";
import { TimeZoneApi } from "./time-zone-api.js";

const TIME_ZONE_API_KEY = "VZMRDAWLXZ19";

let coordinatesApi = new CoordinatesApi();
let timeZoneApi = new TimeZoneApi(TIME_ZONE_API_KEY);

getCurrent();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let city = e.target.city.value.trim();
  let country = e.target.country.value.trim();

  let coordsArray = await coordinatesApi.getCoords(city, country);
  let lat = coordsArray[0].lat;
  let lon = coordsArray[0].lon;

  let timeObject = await timeZoneApi.getTime(lat, lon);
  console.log(timeObject);

  getCurrent();
  updatePage(timeObject, city, country, ".other");

  let hourDifference = difference(new Date(timeObject.formatted).getTime());
  let differenceElement = document.querySelector(".difference__time");
  differenceElement.textContent = hourDifference;
});

async function getCurrent() {
  let currentCity = "Ottawa";
  let currentCountry = "Canada";

  let coordsArray = await coordinatesApi.getCoords(currentCity, currentCountry);

  let lat = coordsArray[0].lat;
  let lon = coordsArray[0].lon;

  let timeObject = await timeZoneApi.getTime(lat, lon);
  console.log(timeObject);

  updatePage(timeObject, currentCity, currentCountry, ".here");
}

function updatePage(timeObject, city, country, update) {
  let date = new Date(timeObject.formatted).toLocaleDateString();
  let time = new Date(timeObject.formatted).toLocaleTimeString();
  let timezone = timeObject.abbreviation;

  let location = Array.from(document.querySelector(update).children);
  location[2].textContent = city;
  location[4].textContent = country;
  location[6].textContent = date;
  location[8].textContent = time;
  location[10].textContent = timezone;
}

function difference(timestamp) {
  let otherDate = new Date(timestamp);
  let currentDate = new Date();
  let temp = "";
  let ms = currentDate - otherDate;

  console.log(otherDate);
  console.log(currentDate);

  if (Math.sign(ms) < 0) {
    temp = "ahead";
  } else {
    temp = "behind";
  }

  let absolute = Math.abs(ms);
  let sec = absolute / 1000;
  let min = sec / 60;
  let hours = min / 60;
  let days = hours / 24;
  let months = days / 30;

  if (sec < 60) {
    return "No Difference";
  } else if (min < 60) {
    let rounding = Math.ceil(min);
    if (rounding == 60) {
      return `1 hour ${temp}`;
    }
    return `${rounding} minutes ${temp}`;
  } else if (hours < 24) {
    return `${Math.ceil(hours)} hours ${temp}`;
  } else if (days < 30) {
    return `${Math.ceil(days)} days ${temp}`;
  } else {
    return "How did you get here??";
  }
}
