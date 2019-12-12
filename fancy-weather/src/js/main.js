/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import initializeStructure from './initiation';
import {
  convertToMeterPerSecond,
  deleteChildren,
  setImgQueryString,
  convertCoords,
  createForecastCard,
} from './utils';
import { dictionary, icons, days, months } from './dictionary';

initializeStructure();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const TAGS = {
  spinner: '.loader',
  buttonBlock: '.button-block',
  refreshImg: '.refresh__img',
  langButton: '.lang__btn',
  langOptions: 'option',
  unitsButtons: '.units__btn',
  searchField: '.search-field',
  searchForm: '.search-form',
  submitButton: '.btn__submit',
  speechBtn: '.speech-input',
  region: '.title__region',
  date: '.title__date',
  time: '.title__time',
  temperature: '.temterature__data',
  weatherIcon: '.weather-icon',
  condition: '.condition',
  feelsLikeData: '.feels-like-data',
  feelsLikeText: '.feels-like-text',
  windData: '.wind-data',
  windText: '.wind-text',
  windUnits: '.wind-units',
  humidityData: '.humidity-data',
  humidityText: '.humidity-text',
  longTermForcast: '.long-time-forecast',
  forecastCard: '.forecast-card',
  map: '.map',
  latitude: '.latitude',
  latitudeText: '.latitude-text',
  longitude: '.longitude',
  longitudeText: '.longitude-text',
};

const NODES = {
  spinner: document.querySelector(TAGS.spinner),
  buttonBlock: document.querySelector(TAGS.buttonBlock),
  refreshImg: document.querySelector(TAGS.refreshImg),
  langButton: document.querySelector(TAGS.langButton),
  langOptions: document.querySelectorAll(TAGS.langOptions),
  unitsButtons: document.querySelectorAll(TAGS.unitsButtons),
  searchField: document.querySelector(TAGS.searchField),
  searchForm: document.querySelector(TAGS.searchForm),
  submitButton: document.querySelector(TAGS.submitButton),
  speechBtn: document.querySelector(TAGS.speechBtn),
  region: document.querySelector(TAGS.region),
  date: document.querySelector(TAGS.date),
  time: document.querySelector(TAGS.time),
  temperature: document.querySelector(TAGS.temperature),
  weatherIcon: document.querySelector(TAGS.weatherIcon),
  condition: document.querySelector(TAGS.condition),
  feelsLikeData: document.querySelector(TAGS.feelsLikeData),
  feelsLikeText: document.querySelector(TAGS.feelsLikeText),
  windData: document.querySelector(TAGS.windData),
  windText: document.querySelector(TAGS.windText),
  windUnits: document.querySelector(TAGS.windUnits),
  humidityData: document.querySelector(TAGS.humidityData),
  humidityText: document.querySelector(TAGS.humidityText),
  longTermForcast: document.querySelector(TAGS.longTermForcast),
  map: document.querySelector(TAGS.map),
  latitude: document.querySelector(TAGS.latitude),
  latitudeText: document.querySelector(TAGS.latitudeText),
  longitude: document.querySelector(TAGS.longitude),
  longitudeText: document.querySelector(TAGS.longitudeText),
  placeholder: document.querySelector(TAGS.searchField, '::placeholder'),
};

const PROPERTIES = {
  unsplashKey: 'da77f8e93ce7acc3573e17bbcf1419d4faf4ee916d5eaba2720f14d388d62bc9',
  darkskyKey: '7051a81a7c46a27c23a3f618342a8e28',
  opencageKey: '1bbe3cf30f934f0ca470af6f7daeccbd',
  location: {
    latitude: null,
    longitude: null,
    name: null,
  },
  lang: localStorage.getItem('lang') || 'en',
  units: localStorage.getItem('units') || 'si',
  map: null,
  mapPin: null,
  timezone: null,
  translationNodes: [
    NODES.submitButton,
    NODES.feelsLikeText,
    NODES.windText,
    NODES.windUnits,
    NODES.humidityText,
    NODES.latitudeText,
    NODES.longitudeText,
    NODES.placeholder,
  ],
  speechRecognition: new SpeechRecognition(),
};

async function updateImage(query) {
  const url = `https://api.unsplash.com/photos/random?query=nature,${query}&client_id=${PROPERTIES.unsplashKey}`;
  const response = await fetch(url);
  const data = await response.json();
  PROPERTIES.imgUrl = data.urls.regular;
  document.body.style.backgroundImage = `linear-gradient(180deg, rgba(8,15,26,0.59) 0%, rgba(17,17,46,0.46) 100%),url(${PROPERTIES.imgUrl})`;
}

async function getWeatherData(latitude, longitude, units) {
  NODES.spinner.classList.add('loading');
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${PROPERTIES.darkskyKey}/${latitude},${longitude}?units=${units}&lang=${PROPERTIES.lang}`;
  const response = await fetch(url);
  const data = await response.json();
  NODES.weatherIcon.src = icons[data.currently.icon];
  NODES.temperature.innerText = data.currently.temperature.toFixed();
  NODES.feelsLikeData.innerText = `${data.currently.apparentTemperature.toFixed()}°`;
  NODES.condition.innerText = data.currently.summary;
  // eslint-disable-next-line operator-linebreak
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
      // eslint-disable-next-line comma-dangle
      currentDate.getDate() + i + 1,
    );
    const temperature = ((item.temperatureHigh + item.temperatureLow) / 2).toFixed();
    NODES.longTermForcast.append(
      createForecastCard(days[PROPERTIES.lang][date.getDay()], `${temperature}°`, icons[item.icon]),
    );
  });
  NODES.spinner.classList.remove('loading');
  console.log(data);
}

async function getCoordinatesFromLocation(location) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${PROPERTIES.opencageKey}&language=${PROPERTIES.lang}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const place = data.results
    // eslint-disable-next-line no-underscore-dangle
    .filter((item) => item.components._type === 'city' || item.components._type === 'state')
    .sort((a, b) => a.confidence - b.confidence)[0];
  console.log(place);
  PROPERTIES.location.name = location;
  PROPERTIES.location.latitude = place.geometry.lat.toString();
  PROPERTIES.location.longitude = place.geometry.lng.toString();
  PROPERTIES.timezone = place.annotations.timezone.name;

  PROPERTIES.map.setCenter([+PROPERTIES.location.latitude, +PROPERTIES.location.longitude], 9);
  PROPERTIES.mapPin.geometry.setCoordinates([
    +PROPERTIES.location.latitude,
    +PROPERTIES.location.longitude,
  ]);

  getWeatherData(PROPERTIES.location.latitude, PROPERTIES.location.longitude, PROPERTIES.units);

  NODES.latitude.innerText = convertCoords(PROPERTIES.location.latitude);
  NODES.longitude.innerText = convertCoords(PROPERTIES.location.longitude);
  NODES.region.innerText = `${place.components.city || place.components.state}, ${
    place.components.country
  }`;
}

async function getLocationFromCoordinates(latitude, longitude) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C+${longitude}&key=${PROPERTIES.opencageKey}&language=${PROPERTIES.lang}`;
  const response = await fetch(url);
  const data = await response.json();
  const place = data.results[0];
  console.log(data);
  NODES.region.innerText = `${place.components.city || place.components.state}, ${
    place.components.country
  }`;
  PROPERTIES.location.name = place.components.city || place.components.state;
  updateImage(setImgQueryString(NODES.time));
}

async function getLocalCoordinates() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    getLocationFromCoordinates(latitude, longitude);
    getWeatherData(latitude, longitude, PROPERTIES.units);
    PROPERTIES.location = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    };
    NODES.latitude.innerText = convertCoords(PROPERTIES.location.latitude);
    NODES.longitude.innerText = convertCoords(PROPERTIES.location.longitude);
    if (PROPERTIES.map) {
      PROPERTIES.map.setCenter([+PROPERTIES.location.latitude, +PROPERTIES.location.longitude], 9);
    }
    if (PROPERTIES.mapPin) {
      PROPERTIES.mapPin.geometry.setCoordinates([
        +PROPERTIES.location.latitude,
        +PROPERTIES.location.longitude,
      ]);
    }
  });
}

function getDate(lang) {
  const date = new Date();
  const dateString = `${days[PROPERTIES.lang][date.getDay()]}, ${
    months[PROPERTIES.lang][date.getMonth()]
  } ${date.getDate()}`;

  NODES.date.innerText = dateString;
}

function updateLanguage() {
  PROPERTIES.translationNodes.forEach((node) => {
    const idx = dictionary.findIndex((el) => node.classList.contains(el.class));
    if (idx !== -1) {
      if (node.hasAttribute('placeholder')) {
        node.setAttribute('placeholder', dictionary[idx].text[PROPERTIES.lang]);
      } else {
        node.innerText = dictionary[idx].text[PROPERTIES.lang];
      }
    }
  });
}

function updateTime() {
  const date = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };

  if (PROPERTIES.timezone) {
    options.timeZone = PROPERTIES.timezone;
  }

  NODES.time.innerText = date.toLocaleString('ru', options);

  setTimeout(updateTime, 1000);
}

function initMap() {
  // eslint-disable-next-line no-undef
  const myMap = new ymaps.Map('map', {
    center: [+PROPERTIES.location.latitude, +PROPERTIES.location.longitude],
    zoom: 9,
  });
  // eslint-disable-next-line no-undef
  PROPERTIES.mapPin = new ymaps.Placemark(myMap.getCenter());
  myMap.geoObjects.add(PROPERTIES.mapPin);

  PROPERTIES.map = myMap;
  PROPERTIES.map.setCenter([+PROPERTIES.location.latitude, +PROPERTIES.location.longitude], 9);
}

window.addEventListener('load', () => {
  // eslint-disable-next-line no-undef
  ymaps.ready(initMap);
  getDate(PROPERTIES.lang);
  updateTime();
  getLocalCoordinates();
  updateLanguage();
  NODES.langOptions.forEach((item) => {
    if (item.value === PROPERTIES.lang) {
      item.setAttribute('selected', true);
    }
  });
  NODES.unitsButtons.forEach((btn) => {
    if (btn.dataset.unit === PROPERTIES.units) {
      btn.classList.remove('btn--inactive');
    }
  });
  console.log(PROPERTIES);
});

NODES.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  PROPERTIES.location.name = NODES.searchField.value;
  getCoordinatesFromLocation(NODES.searchField.value);
  updateImage(setImgQueryString(NODES.time));
});

NODES.buttonBlock.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('refresh__btn') ||
    e.target.parentNode.classList.contains('refresh__btn')
  ) {
    updateImage(setImgQueryString(NODES.time));
    NODES.refreshImg.classList.add('animation-rotate');
  }

  if (e.target.classList.contains('units__btn')) {
    if (!e.target.classList.contains('btn--inactive')) return;
    NODES.unitsButtons.forEach((button) => button.classList.add('btn--inactive'));
    e.target.classList.remove('btn--inactive');
    PROPERTIES.units = e.target.dataset.unit;
    localStorage.setItem('units', e.target.dataset.unit);
    getWeatherData(PROPERTIES.location.latitude, PROPERTIES.location.longitude, PROPERTIES.units);
  }

  if (e.target.classList.contains('lang__btn')) {
    if (e.target.value === PROPERTIES.lang) return;
    PROPERTIES.lang = e.target.value;
    localStorage.setItem('lang', e.target.value);
    getDate(PROPERTIES.lang);
    updateLanguage();
    getWeatherData(PROPERTIES.location.latitude, PROPERTIES.location.longitude, PROPERTIES.units);
    getLocationFromCoordinates(PROPERTIES.location.latitude, PROPERTIES.location.longitude);
  }
});

NODES.refreshImg.addEventListener('animationend', () => {
  NODES.refreshImg.classList.remove('animation-rotate');
});

NODES.speechBtn.addEventListener('click', () => {
  NODES.speechBtn.classList.add('animation-pulse');
  PROPERTIES.speechRecognition.lang = PROPERTIES.lang;
  PROPERTIES.speechRecognition.start();
});

PROPERTIES.speechRecognition.addEventListener('end', () => {
  NODES.speechBtn.classList.remove('animation-pulse');
});

PROPERTIES.speechRecognition.addEventListener('result', (event) => {
  const finalTranscript = event.result[0][0].transcript;
  NODES.searchField.focus();
  NODES.searchField.value = finalTranscript;
  getCoordinatesFromLocation(NODES.searchField.value);
  updateImage(setImgQueryString(NODES.time));
});
