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
  lang: 'en',
  units: 'si',
  map: null,
  mapPin: null,
};

// console.log(NODES);
// console.log(PROPERTIES);
