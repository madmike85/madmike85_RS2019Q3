/* eslint-disable import/prefer-default-export */
import { PROPERTIES } from '../config/config';

const UPNG = require('upng-js');
const download = require('downloadjs');
const Gif = require('gif.js-upgrade/dist/gif');

const frameCanvasSize = 300;

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

function saveAsGIF(name) {
  const gif = new Gif({
    workers: 4,
    workerScript: './js/gif.worker.js',
    width: frameCanvasSize,
    height: frameCanvasSize,
  });

  const frames = PROPERTIES.frames.map((x) => x.context);
  frames.forEach((frame) => {
    gif.addFrame(frame, { copy: true });
  });

  gif.on('finished', (blob) => {
    download(blob, `${name}.gif`, 'image/gif');
  });

  gif.render();
}

export { saveAsAPNG, saveAsGIF };
