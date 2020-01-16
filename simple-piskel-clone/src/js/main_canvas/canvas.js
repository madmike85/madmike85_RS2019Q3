/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-assign */
/* eslint-disable comma-dangle */
import { NODES, PROPERTIES } from '../config/config';
import {
  colorsMatch,
  setPixel,
  getPixel,
  hexToRGB,
  rgbToFullHEX,
  getAdjustedCoordinates,
} from '../utils/utils';
import { updateFrame } from '../frame_roll/frame_roll';

const context = NODES.mainCanvas.getContext('2d');
context.imageSmoothingEnable = false;
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;

NODES.mainCanvas.width = PROPERTIES.canvasWidth;
NODES.mainCanvas.height = PROPERTIES.canvasHeight;

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

function drawLine(ctx, x1, y1, x2, y2) {
  x1 = Math.round(x1);
  y1 = Math.round(y1);
  x2 = Math.round(x2);
  y2 = Math.round(y2);
  const dx = Math.abs(x2 - x1);
  const sx = x1 < x2 ? 1 : -1;
  const dy = Math.abs(y2 - y1);
  const sy = y1 < y2 ? 1 : -1;
  let error;
  let len;
  let rev;
  let count = dx;
  ctx.beginPath();
  if (dx > dy) {
    error = dx / 2;
    rev = x1 > x2 ? 1 : 0;
    if (dy > 1) {
      error = 0;
      count = dy - 1;
      do {
        len = (error / dy + 2) | 0;
        ctx.rect(x1 - len * rev, y1, len, 1 * PROPERTIES.pixelSizeMult);
        x1 += len * sx;
        y1 += sy;
        error -= len * dy - dx;
      } while (count--);
    }
    if (error > 0) {
      ctx.rect(x1, y2, x2 - x1, 1 * PROPERTIES.pixelSizeMult);
    }
  } else if (dx < dy) {
    error = dy / 2;
    rev = y1 > y2 ? 1 : 0;
    if (dx > 1) {
      error = 0;
      count--;
      do {
        len = (error / dx + 2) | 0;
        ctx.rect(x1, y1 - len * rev, 1 * PROPERTIES.pixelSizeMult, len);
        y1 += len * sy;
        x1 += sx;
        error -= len * dx - dy;
      } while (count--);
    }
    if (error > 0) {
      ctx.rect(x2, y1, 1 * PROPERTIES.pixelSizeMult, y2 - y1);
    }
  } else {
    do {
      ctx.rect(x1, y1, 1 * PROPERTIES.pixelSizeMult, 1 * PROPERTIES.pixelSizeMult);
      x1 += sx;
      y1 += sy;
    } while (count--);
  }
  ctx.fillStyle = PROPERTIES.primary;
  ctx.fill();
}

function getColor(eventX, eventY) {
  const [x, y] = getAdjustedCoordinates(eventX, eventY);
  PROPERTIES.sampleColor = rgbToFullHEX(...context.getImageData(x, y, 1, 1).data);
}

function setColor() {
  PROPERTIES.primary = PROPERTIES.sampleColor;
  NODES.primaryColor.setAttribute('value', PROPERTIES.sampleColor);
  NODES.palletWrapper.querySelector('.primary-color').style.backgroundColor = PROPERTIES.primary;
}

function floodFill(ctx, eventX, eventY, fillColor, range = 1) {
  let [x, y] = getAdjustedCoordinates(eventX, eventY);
  const imageData = ctx.getImageData(0, 0, NODES.mainCanvas.width, NODES.mainCanvas.height);
  const visited = new Uint8Array(imageData.width, imageData.height);
  const targetColor = getPixel(imageData, x, y);

  if (!colorsMatch(targetColor, fillColor)) {
    const rangeSq = range * range;
    const pixelsToCheck = [x, y];
    while (pixelsToCheck.length > 0) {
      y = pixelsToCheck.pop();
      x = pixelsToCheck.pop();

      const currentPixelColor = getPixel(imageData, x, y);
      if (
        !visited[y * imageData.width + x] &&
        colorsMatch(currentPixelColor, targetColor, rangeSq)
      ) {
        setPixel(imageData, x, y, fillColor);
        visited[y * imageData.width + x] = 1;
        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
}

function paintAllPixelOfSelectedColor(eventX, eventY, color, range = 1) {
  const [x, y] = getAdjustedCoordinates(eventX, eventY);

  const colorToPaint = context.getImageData(x, y, 1, 1).data;

  const canvasData = context.getImageData(0, 0, NODES.mainCanvas.width, NODES.mainCanvas.height);
  const { data } = canvasData;

  for (let i = 0; i < data.length; i += 4) {
    if ((colorsMatch([...colorToPaint], [data[i], data[i + 1], data[i + 2], 255]), range)) {
      data[i] = color[0];
      data[i + 1] = color[1];
      data[i + 2] = color[2];
    }
  }

  context.putImageData(canvasData, 0, 0);
}

function clearCanvas() {
  context.clearRect(0, 0, NODES.mainCanvas.width, NODES.mainCanvas.height);
}

function loadDataFromSelectedFrame() {
  context.putImageData(PROPERTIES.frames[PROPERTIES.currentFrameId].frameData, 0, 0);
}

function saveCanvasData() {
  PROPERTIES.frames[PROPERTIES.currentFrameId].frameData = context.getImageData(
    0,
    0,
    NODES.mainCanvas.width,
    NODES.mainCanvas.height
  );
}

NODES.mainCanvas.addEventListener(
  'mousedown',
  (e) => {
    PROPERTIES.isMouseDown = true;
    if (PROPERTIES.tool === 'pencil') {
      PROPERTIES.drawingColor = e.which === 1 ? PROPERTIES.primary : PROPERTIES.secondary;
    }
    if (PROPERTIES.tool === 'line') {
      const [x, y] = getAdjustedCoordinates(e.layerX, e.layerY);
      [PROPERTIES.startLineX, PROPERTIES.startLineY] = [x, y];
      PROPERTIES.lineStarted = true;
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
        draw(PROPERTIES.drawingColor);
        updateFrame();
        saveCanvasData();
      }
    }
    if (PROPERTIES.tool === 'eraser') {
      if (PROPERTIES.isMouseDown) {
        context.globalCompositeOperation = 'destination-out';
        [PROPERTIES.lastX, PROPERTIES.lastY] = [e.layerX, e.layerY];
        draw('rgba(0,0,0,1)');
        updateFrame();
        saveCanvasData();
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
    if (PROPERTIES.tool === 'line') {
      const [x, y] = getAdjustedCoordinates(e.layerX, e.layerY);
      drawLine(context, PROPERTIES.startLineX, PROPERTIES.startLineY, x, y);
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
    draw(PROPERTIES.drawingColor);
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
  if (PROPERTIES.tool === 'eyedropper') {
    getColor(e.layerX, e.layerY);
    setColor();
  }
  if (PROPERTIES.tool === 'bucket') {
    const color = hexToRGB(PROPERTIES.primary);
    floodFill(context, e.layerX, e.layerY, color);
  }
  if (PROPERTIES.tool === 'bucket-color') {
    const color = hexToRGB(PROPERTIES.primary);
    paintAllPixelOfSelectedColor(e.layerX, e.layerY, color);
  }

  updateFrame();
  saveCanvasData();
});
NODES.mainCanvas.addEventListener('contextmenu', (e) => e.preventDefault());

export { clearCanvas, loadDataFromSelectedFrame };
