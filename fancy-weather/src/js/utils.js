/* eslint-disable object-curly-newline */
function convertToMeterPerSecond(data) {
  return data * 0.447;
}

function deleteChildren(root) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
}

function setImgQueryString(dateNode) {
  const date = new Date();
  const month = date.getMonth();
  const [hours, minutes] = dateNode.textContent.split(':');
  let queryString = '';

  if (month <= 10) {
    queryString += 'autumn';
  } else if (month <= 7) {
    queryString += 'summer';
  } else if (month <= 4) {
    queryString += 'spring';
  } else if (month >= 11 || month <= 1) {
    queryString += 'winter';
  }

  if (+hours > 23 || +hours <= 6) {
    queryString += ',night';
  }

  return queryString;
}

function convertCoords(coords) {
  const dotIdx = coords.indexOf('.');
  return `${coords.slice(0, dotIdx)}°${coords.slice(dotIdx + 1, dotIdx + 3)}'`;
}

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

export {
  convertToMeterPerSecond,
  deleteChildren,
  setImgQueryString,
  convertCoords,
  createForecastCard,
};
