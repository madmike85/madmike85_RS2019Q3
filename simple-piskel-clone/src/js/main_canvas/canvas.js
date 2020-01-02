/* eslint-disable no-return-assign */
/* eslint-disable comma-dangle */
import { NODES, PROPERTIES } from '../config/config';
import { colorsMatch, setPixel, getPixel, hexToRGB } from '../utils/utils';

const context = NODES.mainCanvas.getContext('2d');
context.imageSmoothingEnable = false;
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;

NODES.mainCanvas.width = PROPERTIES.canvasWidth;
NODES.mainCanvas.height = PROPERTIES.canvasHeight;

let drawingColor;

function draw(color) {
  const calcPixelSize = Math.ceil(
    PROPERTIES.canvasSize / (PROPERTIES.pixelSize / PROPERTIES.pixelSizeMult)
  );
  context.beginPath();
  if (PROPERTIES.lastX > 0 && PROPERTIES.lastY > 0) {
    context.moveTo(PROPERTIES.lastX, PROPERTIES.lastY);
  }

  const fixedX = PROPERTIES.lastX / (PROPERTIES.canvasSize / NODES.mainCanvas.width);
  const fixedY = PROPERTIES.lastY / (PROPERTIES.canvasSize / NODES.mainCanvas.height);

  const x = Math.ceil(fixedX / calcPixelSize) * calcPixelSize - calcPixelSize;
  const y = Math.ceil(fixedY / calcPixelSize) * calcPixelSize - calcPixelSize;

  context.moveTo(x, y);
  context.fillStyle = color;
  context.lineHeight = 0;
  context.fillRect(x, y, calcPixelSize, calcPixelSize);
}

NODES.mainCanvas.addEventListener(
  'mousedown',
  (e) => {
    PROPERTIES.isMouseDown = true;
    if (PROPERTIES.tool === 'pencil') {
      drawingColor = e.button === 0 ? PROPERTIES.primary : PROPERTIES.secondary;
    }

    e.preventDefault();
  },
  false
);
NODES.mainCanvas.addEventListener(
  'mousemove',
  (e) => {
    if (PROPERTIES.tool === 'pencil') {
      if (PROPERTIES.isMouseDown) {
        [PROPERTIES.lastX, PROPERTIES.lastY] = [e.layerX, e.layerY];
        draw(drawingColor);
      }
    }
    if (PROPERTIES.tool === 'eraser') {
      if (PROPERTIES.isMouseDown) {
        context.globalCompositeOperation = 'destination-out';
        [PROPERTIES.lastX, PROPERTIES.lastY] = [e.layerX, e.layerY];
        draw('rgba(0,0,0,1)');
      }
    }
  },
  false
);
NODES.mainCanvas.addEventListener(
  'mouseup',
  (e) => {
    if (PROPERTIES.tool === 'pencil') {
      PROPERTIES.isMouseDown = false;
    }
    context.globalCompositeOperation = 'source-over';
    e.preventDefault();
  },
  false
);
NODES.mainCanvas.addEventListener('mouseout', () => (PROPERTIES.isMouseDown = false));
NODES.mainCanvas.addEventListener('click', (e) => {
  if (PROPERTIES.tool === 'pencil') {
    PROPERTIES.isMouseDown = true;
    [PROPERTIES.lastX, PROPERTIES.lastY] = [e.layerX, e.layerY];
    draw(drawingColor);
    PROPERTIES.isMouseDown = false;
  }
  if (PROPERTIES.tool === 'eraser') {
    PROPERTIES.isMouseDown = true;
    context.globalCompositeOperation = 'destination-out';
    [PROPERTIES.lastX, PROPERTIES.lastY] = [e.layerX, e.layerY];
    draw('rgba(0,0,0,1)');
    PROPERTIES.isMouseDown = false;
    context.globalCompositeOperation = 'source-over';
  }
});
NODES.mainCanvas.addEventListener('contextmenu', (e) => e.preventDefault());
