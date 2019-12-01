const controlBlock = [
  {
    tag: 'header',
    classes: ['header'],
    innerHtml: [
      {
        tag: 'div',
        classes: ['button-block'],
        innerHtml: [
          {
            tag: 'div',
            classes: ['btn', 'btn--small', 'refresh__btn'],
            innerHtml: [
              {
                tag: 'img',
                attributes: [['src', '../assets/img/refresh.svg']],
              },
            ],
          },
          {
            tag: 'select',
            classes: ['btn', 'btn--med', 'lang__btn'],
            innerHtml: [
              {
                tag: 'option',
                attributes: [
                  ['value', 'en'],
                  ['selected', true],
                ],
                innerText: 'EN',
              },
              {
                tag: 'option',
                attributes: [['value', 'ru']],
                innerText: 'RU',
              },
              {
                tag: 'option',
                attributes: [['value', 'be']],
                innerText: 'BE',
              },
            ],
          },
          {
            tag: 'div',
            classes: ['units-container'],
            innerHtml: [
              {
                tag: 'div',
                classes: ['btn', 'btn--small', 'units__btn', 'farenheit__btn', 'btn--inactive'],
                attributes: [['data-unit', 'us']],
                innerText: '°F',
              },
              {
                tag: 'div',
                classes: ['btn', 'btn--small', 'units__btn', 'celsius__btn'],
                attributes: [['data-unit', 'si']],
                innerText: '°C',
              },
            ],
          },
        ],
      },
      {
        tag: 'form',
        classes: ['search-form'],
        innerHtml: [
          {
            tag: 'input',
            classes: ['search-field'],
            attributes: [
              ['type', 'text'],
              ['placeholder', 'Search city or ZIP'],
            ],
          },
          {
            tag: 'div',
            classes: ['speech-input'],
            innerHtml: [
              {
                tag: 'img',
                attributes: [['src', '../assets/img/speech-btn.png']],
              },
            ],
          },
          {
            tag: 'button',
            classes: ['btn', 'btn--large', 'btn__submit'],
            attributes: [['type', 'submit']],
            innerText: 'search',
          },
        ],
      },
    ],
  },
];

const weatherBlock = [
  {
    tag: 'div',
    classes: ['weather-block'],
    innerHtml: [
      {
        tag: 'div',
        classes: ['weather__title'],
        innerHtml: [
          {
            tag: 'h1',
            classes: ['title__region'],
          },
          {
            tag: 'div',
            classes: ['title__date-container'],
            innerHtml: [
              {
                tag: 'p',
                classes: ['title__date'],
              },
              {
                tag: 'p',
                classes: ['title__time'],
              },
            ],
          },
        ],
      },
      {
        tag: 'div',
        classes: ['daily-weather-block'],
        innerHtml: [
          {
            tag: 'div',
            classes: ['temperature'],
            innerHtml: [
              {
                tag: 'p',
                classes: ['temterature__data'],
              },
              {
                tag: 'p',
                classes: ['temperature__unit'],
                innerText: '°',
              },
            ],
          },
          {
            tag: 'div',
            classes: ['daily-data-block'],
            innerHtml: [
              {
                tag: 'img',
                classes: ['weather-icon'],
                attributes: [['src', '../assets/img/gloomy.svg']],
              },
              {
                tag: 'div',
                classes: ['daily-data'],
                innerHtml: [
                  {
                    tag: 'p',
                    classes: ['condition'],
                  },
                  {
                    tag: 'p',
                    innerHtml: [
                      {
                        tag: 'span',
                        classes: ['feels-like-text'],
                        innerText: 'feels like: ',
                      },
                      {
                        tag: 'span',
                        classes: ['feels-like-data'],
                      },
                    ],
                  },
                  {
                    tag: 'p',
                    innerHtml: [
                      {
                        tag: 'span',
                        classes: ['wind-text'],
                        innerText: 'wind: ',
                      },
                      {
                        tag: 'span',
                        classes: ['wind-data'],
                      },
                      {
                        tag: 'span',
                        classes: ['wind-units'],
                        innerText: 'm/s',
                      },
                    ],
                  },
                  {
                    tag: 'p',
                    innerHtml: [
                      {
                        tag: 'span',
                        classes: ['humidity-text'],
                        innerText: 'humidity: ',
                      },
                      {
                        tag: 'span',
                        classes: ['humidity-data'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        tag: 'div',
        classes: ['long-time-forecast'],
      },
    ],
  },
];

const geolocationBlock = [
  {
    tag: 'div',
    classes: ['geolocation-block'],
    innerHtml: [
      {
        tag: 'div',
        classes: ['map'],
        attributes: [['id', 'map']],
      },
      {
        tag: 'div',
        classes: ['coordinates'],
        innerHtml: [
          {
            tag: 'p',
            innerHtml: [
              {
                tag: 'span',
                classes: ['latitude-text'],
                innerText: 'Latitude: ',
              },
              {
                tag: 'span',
                classes: ['latitude'],
              },
            ],
          },
          {
            tag: 'p',
            innerHtml: [
              {
                tag: 'span',
                classes: ['longitude-text'],
                innerText: 'Longitude: ',
              },
              {
                tag: 'span',
                classes: ['longitude'],
              },
            ],
          },
        ],
      },
    ],
  },
];

export { controlBlock, weatherBlock, geolocationBlock };
