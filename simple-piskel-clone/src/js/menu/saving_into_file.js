/* eslint-disable import/prefer-default-export */
import { PROPERTIES } from '../config/config';

const UPNG = require('upng-js');
const download = require('downloadjs');

function saveAsAPNG(name) {
  const framesData = PROPERTIES.frames.map((x) => x.frameData.data.buffer);
  const delays = new Array(framesData.length).fill(100);
  const result = UPNG.encode(
    framesData,
    PROPERTIES.canvasWidth,
    PROPERTIES.canvasHeight,
    0,
    delays,
  );
  download(result, `${name}.apng`, 'image/apng');
}

export { saveAsAPNG };
