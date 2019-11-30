import initializeStructure from './initiation';
import { convertToMeterPerSecond, deleteChildren, setImgQueryString, convertCoords } from './utils';

initializeStructure();

const TAGS = {
  buttonBlock: '.button-block',
  unitsButtons: '.units__btn',
  searchField: '.search-field',
  searchForm: '.search-form',
  submitButton: '.btn__submit',
  region: '.title__region',
  date: '.title__date',
  time: '.title__time',
  temperature: '.temterature__data',
  weatherIcon: '.weather-icon',
  condition: '.condition',
  feelsLikeData: '.feels-like-data',
  windData: '.wind-data',
  humidityData: '.humidity-data',
  longTermForcast: '.long-time-forecast',
  forecastCard: '.forecast-card',
  map: '.map',
  latitude: '.latitude',
  longitude: '.longitude',
};

const NODES = {
  buttonBlock: document.querySelector(TAGS.buttonBlock),
  unitsButtons: document.querySelectorAll(TAGS.unitsButtons),
  searchField: document.querySelector(TAGS.searchField),
  searchForm: document.querySelector(TAGS.searchForm),
  submitButton: document.querySelector(TAGS.submitButton),
  region: document.querySelector(TAGS.region),
  date: document.querySelector(TAGS.date),
  time: document.querySelector(TAGS.time),
  temperature: document.querySelector(TAGS.temperature),
  weatherIcon: document.querySelector(TAGS.weatherIcon),
  condition: document.querySelector(TAGS.condition),
  feelsLikeData: document.querySelector(TAGS.feelsLikeData),
  windData: document.querySelector(TAGS.windData),
  humidityData: document.querySelector(TAGS.humidityData),
  longTermForcast: document.querySelector(TAGS.longTermForcast),
  map: document.querySelector(TAGS.map),
  latitude: document.querySelector(TAGS.latitude),
  longitude: document.querySelector(TAGS.longitude),
};

const PROPERTIES = {
  unsplashKey: 'da77f8e93ce7acc3573e17bbcf1419d4faf4ee916d5eaba2720f14d388d62bc9',
  darkskyKey: '7051a81a7c46a27c23a3f618342a8e28',
  opencageKey: '1bbe3cf30f934f0ca470af6f7daeccbd',
  imageUrl: null,
  location: {
    latitude: null,
    longitude: null,
    name: null,
  },
  lang: 'ru',
  units: 'si',
  map: null,
  mapPin: null,
};

// console.log(NODES);
// console.log(PROPERTIES);

function createForecastCard(title, data, icon) {
  const forecastCard = document.createElement('div');
  forecastCard.classList.add('forecast-card');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card__title');
  cardTitle.innerText = title;

  const cardBody = document.createElement('div');
  cardBody.classList.add('card__body');

  const cardData = document.createElement('p');
  cardData.classList.add('card__data');
  cardData.innerText = data;

  const cardIcon = document.createElement('img');
  cardIcon.classList.add('card__icon');
  cardIcon.setAttribute('src', icon);

  cardBody.append(cardData);
  cardBody.append(cardIcon);

  forecastCard.append(cardTitle);
  forecastCard.append(cardBody);

  return forecastCard;
}

async function updateImage(query) {
  const url = `https://api.unsplash.com/photos/random?query=${query},nature&client_id=${PROPERTIES.unsplashKey}`;
  const response = await fetch(url);
  const data = await response.json();
  PROPERTIES.imgUrl = data.urls.regular;
  document.body.style.backgroundImage = `linear-gradient(180deg, rgba(8,15,26,0.59) 0%, rgba(17,17,46,0.46) 100%),url(${PROPERTIES.imgUrl})`;
}

async function getWeatherData(latitude, longitude, units) {
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${PROPERTIES.darkskyKey}/${latitude},${longitude}?units=${units}&lang=${PROPERTIES.lang}`;
  const response = await fetch(url);
  const data = await response.json();
  NODES.temperature.innerText = data.currently.temperature.toFixed();
  NODES.feelsLikeData.innerText = `${data.currently.apparentTemperature.toFixed()}°`;
  NODES.condition.innerText = data.currently.summary;
  NODES.windData.innerText =
    PROPERTIES.units === 'si'
      ? data.currently.windSpeed.toFixed()
      : convertToMeterPerSecond(data.currently.windSpeed).toFixed();
  NODES.humidityData.innerText = `${(data.currently.humidity * 100).toFixed()}%`;

  const dailyForecast = data.daily.data.slice(0, 3);
  deleteChildren(NODES.longTermForcast);
  dailyForecast.forEach((item, i) => {
    const currentDate = new Date();
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + i + 1
    );
    const dateString = date.toLocaleString(PROPERTIES.lang, { weekday: 'long' });
    const temperature = ((item.temperatureHigh + item.temperatureLow) / 2).toFixed();
    NODES.longTermForcast.append(
      createForecastCard(dateString, `${temperature}°`, '/assets/img/cloudy.svg')
    );
  });
  console.log(data);
}

function getLocalCoordinates() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    PROPERTIES.location = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    };

    NODES.latitude.innerText = convertCoords(PROPERTIES.location.latitude);
    NODES.longitude.innerText = convertCoords(PROPERTIES.location.longitude);
  });
}

async function getCoordinatesFromLocation(location) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${PROPERTIES.opencageKey}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const place = data.results.sort((a, b) => a.confidence - b.confidence)[0];
  console.log(place);
  PROPERTIES.location.name = location;
  PROPERTIES.location.latitude = place.geometry.lat.toString();
  PROPERTIES.location.longitude = place.geometry.lng.toString();

  PROPERTIES.map.setCenter([+PROPERTIES.location.latitude, +PROPERTIES.location.longitude], 9);
  PROPERTIES.mapPin.geometry.setCoordinates([
    +PROPERTIES.location.latitude,
    +PROPERTIES.location.longitude,
  ]);

  NODES.latitude.innerText = convertCoords(PROPERTIES.location.latitude);
  NODES.longitude.innerText = convertCoords(PROPERTIES.location.longitude);
  NODES.region.innerText = `${place.components.city}, ${place.components.country}`;
}

function getDate(lang) {
  const date = new Date();
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  };

  NODES.date.innerText = date.toLocaleString(lang, options);
}

function updateTime() {
  const date = new Date();

  const h = date.getHours();
  const m = date.getMinutes();

  const hh = h < 10 ? `0${h}` : h;
  const mm = m < 10 ? `0${m}` : m;

  NODES.time.innerText = `${hh}:${mm}`;

  setTimeout(updateTime, 1000);
}

function initMap() {
  // eslint-disable-next-line no-undef
  const myMap = new ymaps.Map('map', {
    center: [+PROPERTIES.location.latitude, +PROPERTIES.location.longitude],
    zoom: 9,
  });
  PROPERTIES.mapPin = new ymaps.Placemark(myMap.getCenter());
  myMap.geoObjects.add(PROPERTIES.mapPin);

  PROPERTIES.map = myMap;
  PROPERTIES.map.setCenter([+PROPERTIES.location.latitude, +PROPERTIES.location.longitude], 9);
}

window.addEventListener('load', () => {
  getDate(PROPERTIES.lang);
  updateTime();
  getLocalCoordinates();
  // eslint-disable-next-line no-undef
  ymaps.ready(initMap);
});

NODES.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  PROPERTIES.location.name = NODES.searchField.value;
  updateImage(setImgQueryString());
  getCoordinatesFromLocation(NODES.searchField.value);
  getWeatherData(PROPERTIES.location.latitude, PROPERTIES.location.longitude, PROPERTIES.units);
});

NODES.buttonBlock.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('refresh__btn') ||
    e.target.parentNode.classList.contains('refresh__btn')
  ) {
    updateImage(setImgQueryString());
  }

  if (e.target.classList.contains('units__btn')) {
    NODES.unitsButtons.forEach((button) => button.classList.add('btn--inactive'));
    e.target.classList.remove('btn--inactive');
  }
});
