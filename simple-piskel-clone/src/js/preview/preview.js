import { NODES, PROPERTIES } from '../config/config';

const context = NODES.previewCanvas.getContext('2d');
NODES.previewCanvas.width = 100;
NODES.previewCanvas.height = 100;
let frameIdx = 0;

function drawFrame() {
  if (PROPERTIES.fps === 0) {
    context.putImageData(PROPERTIES.frames[0].frameData, 35, 35);
  }
  setTimeout(() => {
    if (PROPERTIES.frames[frameIdx] && PROPERTIES.frames[frameIdx].frameData) {
      context.putImageData(PROPERTIES.frames[frameIdx].frameData, 35, 35);
    }
    frameIdx += 1;
    if (frameIdx >= PROPERTIES.frames.length) {
      frameIdx = 0;
    }
    requestAnimationFrame(drawFrame);
  }, 1000 / PROPERTIES.fps);
}

requestAnimationFrame(drawFrame);
