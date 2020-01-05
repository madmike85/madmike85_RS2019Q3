/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */

import { NODES, PROPERTIES } from '../config/config';

function colorsMatch(a, b, rangeSq) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  const da = a[3] - b[3];
  return dr * dr + dg * dg + db * db + da * da < rangeSq;
}

function getPixel(imageData, x, y) {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1];
  }
  const offset = (y * imageData.width + x) * 4;
  return imageData.data.slice(offset, offset + 4);
}

function setPixel(imageData, x, y, color) {
  const offset = (y * imageData.width + x) * 4;
  imageData.data[offset + 0] = color[0];
  imageData.data[offset + 1] = color[1];
  imageData.data[offset + 2] = color[2];
  imageData.data[offset + 3] = 255;
}

function hexToRGB(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return [r, g, b, alpha];
  }
  return [r, g, b];
}

function rgbToHEX(chanel) {
  let hex = chanel.toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
}

function rgbToFullHEX(r, g, b) {
  return `#${rgbToHEX(r)}${rgbToHEX(g)}${rgbToHEX(b)}`;
}

function getAdjustedCoordinates(eventX, eventY) {
  const calcPixelSize = Math.ceil(
    PROPERTIES.canvasSize / (PROPERTIES.pixelSize / PROPERTIES.pixelSizeMult)
  );
  const fixedX = eventX / (PROPERTIES.canvasSize / NODES.mainCanvas.width);
  const fixedY = eventY / (PROPERTIES.canvasSize / NODES.mainCanvas.height);

  const x = Math.ceil(fixedX / calcPixelSize) * calcPixelSize - calcPixelSize;
  const y = Math.ceil(fixedY / calcPixelSize) * calcPixelSize - calcPixelSize;

  return [x, y];
}

export { colorsMatch, getPixel, setPixel, hexToRGB, rgbToFullHEX, getAdjustedCoordinates };
