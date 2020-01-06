import { PROPERTIES } from '../config/config';

const UPNG = require('upng-js');
const download = require('downloadjs');

function saveIntoFile(name) {
  const frames = PROPERTIES.frames.map((x) => x.frameData.data);
  const delays = new Array(frames.length).fill(500);
  const result = UPNG.encode(frames, 200, 200, 0, delays);
  download(result, `${name}.apng`, 'apng');
}

export { saveIntoFile };
