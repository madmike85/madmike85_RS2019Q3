/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-assign */
/* eslint-disable comma-dangle */
import { NODES, PROPERTIES } from '../config/config';
import { colorsMatch, setPixel, getPixel, hexToRGB, rgbToFullHEX } from '../utils/utils';

const context = NODES.mainCanvas.getContext('2d');
context.imageSmoothingEnable = false;
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;

NODES.mainCanvas.width = PROPERTIES.canvasWidth;
NODES.mainCanvas.height = PROPERTIES.canvasHeight;

function draw(color) {
  // TODO: Refactor caclculation x and y by moving it to separate function
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

function getColor(eventX, eventY) {
  // TODO: Refactor caclculation x and y by moving it to separate function
  const calcPixelSize = Math.ceil(
    PROPERTIES.canvasSize / (PROPERTIES.pixelSize / PROPERTIES.pixelSizeMult)
  );
  const fixedX = eventX / (PROPERTIES.canvasSize / NODES.mainCanvas.width);
  const fixedY = eventY / (PROPERTIES.canvasSize / NODES.mainCanvas.height);

  const x = Math.ceil(fixedX / calcPixelSize) * calcPixelSize - calcPixelSize;
  const y = Math.ceil(fixedY / calcPixelSize) * calcPixelSize - calcPixelSize;
  PROPERTIES.sampleColor = rgbToFullHEX(...context.getImageData(x, y, 1, 1).data);
}

function setColor() {
  PROPERTIES.primary = PROPERTIES.sampleColor;
  NODES.primaryColor.setAttribute('value', PROPERTIES.sampleColor);
  NODES.palletWrapper.querySelector('.primary-color').style.backgroundColor = PROPERTIES.primary;
}

function floodFill(ctx, eventX, eventY, fillColor, range = 1) {
  // TODO: Refactor caclculation x and y by moving it to separate function
  const calcPixelSize = Math.ceil(
    PROPERTIES.canvasSize / (PROPERTIES.pixelSize / PROPERTIES.pixelSizeMult)
  );
  const fixedX = eventX / (PROPERTIES.canvasSize / NODES.mainCanvas.width);
  const fixedY = eventY / (PROPERTIES.canvasSize / NODES.mainCanvas.height);

  let x = Math.ceil(fixedX / calcPixelSize) * calcPixelSize - calcPixelSize;
  let y = Math.ceil(fixedY / calcPixelSize) * calcPixelSize - calcPixelSize;
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
  // TODO: Refactor caclculation x and y by moving it to separate function
  const calcPixelSize = Math.ceil(
    PROPERTIES.canvasSize / (PROPERTIES.pixelSize / PROPERTIES.pixelSizeMult)
  );
  const fixedX = eventX / (PROPERTIES.canvasSize / NODES.mainCanvas.width);
  const fixedY = eventY / (PROPERTIES.canvasSize / NODES.mainCanvas.height);

  const x = Math.ceil(fixedX / calcPixelSize) * calcPixelSize - calcPixelSize;
  const y = Math.ceil(fixedY / calcPixelSize) * calcPixelSize - calcPixelSize;

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

NODES.mainCanvas.addEventListener(
  'mousedown',
  (e) => {
    PROPERTIES.isMouseDown = true;
    if (PROPERTIES.tool === 'pencil') {
      PROPERTIES.drawingColor = e.which === 1 ? PROPERTIES.primary : PROPERTIES.secondary;
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
});
NODES.mainCanvas.addEventListener('contextmenu', (e) => e.preventDefault());
