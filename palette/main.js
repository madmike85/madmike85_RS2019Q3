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

let colorLayerData;

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

function floodFill(startX, startY, startR, startG, startB) {
  // TODO: Implement fill flood
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
canvas.addEventListener('click', () => {
  colorLayerData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
});
