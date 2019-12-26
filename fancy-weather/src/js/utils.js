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
  const [hours] = dateNode.textContent.split(':');
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
  const card = `<div class="forecast-card">
    <h2 class="card__title">${title}</h2>
    <div class="card__body">
      <p class="card__data">${data}</p>
      <img class="card__icon" src="${icon}">
    </div>
  </div>`;

  return card;
}

export {
  convertToMeterPerSecond,
  deleteChildren,
  setImgQueryString,
  convertCoords,
  createForecastCard,
};
