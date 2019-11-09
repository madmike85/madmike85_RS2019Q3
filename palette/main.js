const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnable = false;

const toolItems = document.querySelectorAll('.tool-item');
const paletteItems = document.querySelectorAll('.palette-item');
const currentColor = document.querySelector('.current-color');
const previousColor = document.querySelector('.prev-color');

const pixelSizeX = 8;
const pixelSizeY = 8;

const canvasWidth = 512;
const canvasHeight = 512;

const properties = {
  tool: null,
  curColor: 'BADA55',
  prevColor: null,
  isMouseDown: false,
  lastX: 0,
  lastY: 0
};

function draw() {
  if (properties.isMouseDown) {
    ctx.beginPath();
    if (properties.lastX > 0 && properties.lastY > 0) ctx.moveTo(properties.lastX, properties.lastY);
    const x = Math.ceil(properties.lastX / pixelSizeX) * pixelSizeX - pixelSizeX;
    const y = Math.ceil(properties.lastY / pixelSizeY) * pixelSizeY - pixelSizeY;
    ctx.moveTo(x, y);
    ctx.fillStyle = properties.curColor;
    ctx.lineHeight = 0;
    ctx.fillRect(x, y, pixelSizeX, pixelSizeY);
  }
}

function getPixel(imageData, x, y) {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1];
  } else {
    const offset = (y * imageData.width + x) * 4;
    return imageData.data.slice(offset, offset + 4);
  }
}

function setPixel(imageData, x, y, color) {
  const offset = (y * imageData.width + x) * 4;
  imageData.data[offset + 0] = color[0];
  imageData.data[offset + 1] = color[1];
  imageData.data[offset + 2] = color[2];
  imageData.data[offset + 3] = color[0];
}

function colorsMatch(a, b, rangeSq) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  const da = a[3] - b[3];
  return dr * dr + dg * dg + db * db + da * da < rangeSq;
}

function floodFill(ctx, x, y, fillColor, range = 1) {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const visited = new Uint8Array(imageData.width, imageData.height);
  const targetColor = getPixel(imageData, x, y);

  if (!colorsMatch(targetColor, fillColor)) {
    const rangeSq = range * range;
    const pixelsToCheck = [x, y];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();

      const currentColor = getPixel(imageData, x, y);
      if (!visited[y * imageData.width + x] && colorsMatch(currentColor, targetColor, rangeSq)) {
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

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

toolItems.forEach(element => {
  element.addEventListener('click', e => {
    if (element.classList.contains('active')) {
      return;
    } else if (!element.classList.contains('disabled')) {
      toolItems.forEach(element => element.classList.remove('active'));
      element.classList.add('active');
      properties.tool = element.dataset.tool;
    }
  });
});

paletteItems.forEach(element => {
  element.addEventListener('click', () => {
    properties.prevColor = properties.curColor;
    properties.curColor = element.dataset.color;

    currentColor.querySelector('.color-sample').style.backgroundColor = properties.curColor;
    previousColor.querySelector('.color-sample').style.backgroundColor = properties.prevColor;
  });
});

canvas.addEventListener(
  'mousedown',
  e => {
    if (properties.tool === 'pencil') {
      properties.isMouseDown = true;
    }
    e.preventDefault();
  },
  false
);
canvas.addEventListener(
  'mousemove',
  e => {
    if (properties.tool === 'pencil') {
      [properties.lastX, properties.lastY] = [e.layerX, e.layerY];
      draw();
    }
  },
  false
);
canvas.addEventListener(
  'mouseup',
  e => {
    if (properties.tool === 'pencil') {
      properties.isMouseDown = false;
    }
    e.preventDefault();
  },
  false
);
canvas.addEventListener('mouseout', () => (properties.isMouseDown = false));
canvas.addEventListener('click', e => {
  if (properties.tool === 'bucket') {
    const curColor = hexToRgb(properties.curColor);
    floodFill(ctx, e.layerX, e.layerY, [curColor.r, curColor.g, curColor.b, curColor.a]);
  }
});
