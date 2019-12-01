/* eslint-disable object-curly-newline */
function convertToMeterPerSecond(data) {
  return data * 0.447;
}

function deleteChildren(root) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
}

function setImgQueryString() {
  const date = new Date();
  const month = date.getMonth();
  const hours = date.getHours();
  let queryString = '';

  if (month <= 10) {
    queryString += 'autumn';
  } else if (month <= 7) {
    queryString += 'summer';
  } else if (month <= 4) {
    queryString += 'spring';
  } else if (month >= 11 && month <= 1) {
    queryString += 'winter';
  }

  if (hours > 23 || hours <= 6) {
    queryString += ',night';
  }

  return queryString;
}

function convertCoords(coords) {
  const dotIdx = coords.indexOf('.');
  return `${coords.slice(0, dotIdx)}°${coords.slice(dotIdx + 1, dotIdx + 3)}'`;
}

export { convertToMeterPerSecond, deleteChildren, setImgQueryString, convertCoords };
