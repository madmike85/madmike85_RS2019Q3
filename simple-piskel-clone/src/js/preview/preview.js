/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
import { NODES, PROPERTIES } from '../config/config';

const context = NODES.previewCanvas.getContext('2d');
NODES.previewCanvas.width = PROPERTIES.canvasWidth;
NODES.previewCanvas.height = PROPERTIES.canvasHeight;
let frameIdx = 0;

function drawFrame() {
  if (PROPERTIES.fps === 0) {
    context.putImageData(PROPERTIES.frames[0].frameData, 0, 0);
  }
  setTimeout(() => {
    if (PROPERTIES.frames[frameIdx] && PROPERTIES.frames[frameIdx].frameData) {
      context.putImageData(PROPERTIES.frames[frameIdx].frameData, 0, 0);
    }
    frameIdx += 1;
    if (frameIdx >= PROPERTIES.frames.length) {
      frameIdx = 0;
    }
    requestAnimationFrame(drawFrame);
  }, 1000 / PROPERTIES.fps);
}

function fullscreenPreview() {
  if (
    'fullscreenEnabled' in document ||
    'webkitFullscreenEnabled' in document ||
    'mozFullScreenEnabled' in document
  ) {
    if (
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled
    ) {
      const element = NODES.previewCanvas;
      if ('requestFullscreen' in element) {
        element.requestFullscreen();
      } else if ('webkitRequestFullscreen' in element) {
        element.webkitRequestFullscreen();
      } else if ('mozRequestFullScreen' in element) {
        element.mozRequestFullScreen();
      }
    }
  } else {
    console.log("User doesn't allow full screen");
  }
}

function fullscreenChange() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement
  ) {
    console.log(
      `Current full screen element is : 
        ${document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement}`
    );
  } else if ('exitFullscreen' in document) {
    document.exitFullscreen();
  } else if ('webkitExitFullscreen' in document) {
    document.webkitExitFullscreen();
  } else if ('mozCancelFullScreen' in document) {
    document.mozCancelFullScreen();
  }
}

requestAnimationFrame(drawFrame);

document.addEventListener('fullscreenchange', fullscreenChange);
document.addEventListener('webkitfullscreenchange', fullscreenChange);
document.addEventListener('mozfullscreenchange', fullscreenChange);

document.addEventListener('fullscreenerror', () => {
  console.log('Full screen failed');
});
document.addEventListener('webkitfullscreenerror', () => {
  console.log('Full screen failed');
});
document.addEventListener('mozfullscreenerror', () => {
  console.log('Full screen failed');
});

NODES.fullscreenBtn.addEventListener('click', () => {
  fullscreenPreview();
});

export { fullscreenPreview };
