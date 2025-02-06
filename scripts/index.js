import { CoordinatesApi } from "./coordinates-api.js";
import { TimeZoneApi } from "./time-zone-api.js";

const TIME_ZONE_API_KEY = "VZMRDAWLXZ19";

let coordinatesApi = new CoordinatesApi();
let timeZoneApi = new TimeZoneApi(TIME_ZONE_API_KEY);

let city = "Halifax";
let country = "Canada";

let coordsArray = await coordinatesApi.getCoords(city, country);

let lat = coordsArray[0].lat;
let lon = coordsArray[0].lon;

let timeObject = await timeZoneApi.getTime(lat, lon);
console.log(timeObject);

let date = new Date(timeObject.formatted).toLocaleDateString();
let time = new Date(timeObject.formatted).toLocaleTimeString();
let timezone = timeObject.abbreviation;

console.log(date);
console.log(time);
console.log(timezone);

let hourDifference = difference(new Date(timeObject.formatted).getTime());

console.log(hourDifference);

function difference(timestamp) {
  let otherDate = new Date(timestamp);
  let currentDate = new Date();
  let temp = "";
  let ms = currentDate - otherDate;

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
    return `${Math.ceil(sec)} seconds ${temp}`;
  } else if (min < 60) {
    return `${Math.ceil(min)} minutes ${temp}`;
  } else if (hours < 24) {
    return `${Math.ceil(hours)} hours ${temp}`;
  } else if (days < 30) {
    return `${Math.ceil(days)} days ${temp}`;
  } else {
    return commentDate.toLocaleDateString();
  }
}
