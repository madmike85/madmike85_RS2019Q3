const dictionary = [
  {
    class: 'btn__submit',
    text: {
      en: 'search',
      ru: 'искать',
      be: 'пошук',
    },
  },
  {
    class: 'wind-text',
    text: {
      en: 'wind: ',
      ru: 'ветер: ',
      be: 'вецер: ',
    },
  },
  {
    class: 'feels-like-text',
    text: {
      en: 'feels like: ',
      ru: 'ощущается: ',
      be: 'адчувацца: ',
    },
  },
  {
    class: 'wind-units',
    text: {
      en: 'm/s',
      ru: 'м/с',
      be: 'м/с',
    },
  },
  {
    class: 'humidity-text',
    text: {
      en: 'humidity: ',
      ru: 'влажность: ',
      be: 'вільготнасць: ',
    },
  },
  {
    class: 'latitude-text',
    text: {
      en: 'Latitude: ',
      ru: 'Широта: ',
      be: 'Шырата: ',
    },
  },
  {
    class: 'longitude-text',
    text: {
      en: 'Longitude: ',
      ru: 'Долгота: ',
      be: 'Даўгата: ',
    },
  },
  {
    class: 'search-field',
    text: {
      en: 'Search city',
      ru: 'Поиск по городу',
      be: 'Пошук па горадзе',
    },
  },
];

const icons = {
  'clear-day': '/assets/img/Sun.svg',
  'clear-night': '/assets/img/Moon.svg',
  rain: '/assets/img/Cloud-Rain.svg',
  snow: '/assets/img/Cloud-Snow.svg',
  sleet: '/assets/img/Cloud-Hail.svg',
  wind: '/assets/img/Wind.svg',
  fog: '/assets/img/Cloud-Fog-Alt.svg',
  cloudy: '/assets/img/Cloud.svg',
  'partly-cloudy-day': '/assets/img/Cloud-Sun.svg',
  'partly-cloudy-night': '/assets/img/Cloud-Moon.svg',
};

const days = {
  en: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  ru: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  be: ['нядзеля', 'панядзелак', 'аўторак', 'серада', 'чацвер', 'пятніца', 'субота'],
};

const months = {
  en: [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ],
  ru: [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ],
  be: [
    'студзеня',
    'лютага',
    'сакавіка',
    'красавіка',
    'мая',
    'чэрвеня',
    'ліпеня',
    'жніўня',
    'верасня',
    'кастрычніка',
    'лістапада',
    'снежня',
  ],
};

export { dictionary, icons, days, months };
