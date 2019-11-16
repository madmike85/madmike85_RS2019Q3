const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnable = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;

const toolItems = document.querySelectorAll('.tool-item');
const paletteItems = document.querySelectorAll('.palette-item');
const currentColor = document.querySelector('.current-color');
const previousColor = document.querySelector('.prev-color');

const colorPicker = document.getElementById('color-picker');
const colorPickerWrapper = document.getElementById('color-picker-wrapper');

const clearBtn = document.querySelector('.clear-btn');
const loadBtn = document.querySelector('.load-btn');
const greyScaleBtn = document.querySelector('.greyscale-btn');
const searchField = document.querySelector('.search-field');

const rangeSlider = document.querySelector('.range-slider__range');
const rangeBullet = document.querySelector('.range-slider__label');

const alertBox = document.querySelector('.alert-popup');

const canvasSize = 512;
const fieldSize = 64;

canvas.width = 512;
canvas.height = 512;

const accessKey = 'da77f8e93ce7acc3573e17bbcf1419d4faf4ee916d5eaba2720f14d388d62bc9';

const calcPixelSizeX = Math.ceil(canvasSize / fieldSize);
const calcPixelSizeY = Math.ceil(canvasSize / fieldSize);

const properties = {
  tool: 'pencil',
  curColor: '#41f795',
  prevColor: '#ffa500',
  isMouseDown: false,
  isImgLoaded: false,
  lastX: 0,
  lastY: 0,
};

colorPicker.onchange = () => {
  colorPickerWrapper.style.backgroundColor = colorPicker.value;
  properties.prevColor = properties.curColor;
  properties.curColor = colorPicker.value;
  currentColor.setAttribute('data-color', properties.curColor);
  previousColor.setAttribute('data-color', properties.prevColor);
};
colorPickerWrapper.style.backgroundColor = colorPicker.value;

function refreshCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  properties.isImgLoaded = false;
}

function draw() {
  if (properties.isMouseDown) {
    ctx.beginPath();
    if (properties.lastX > 0 && properties.lastY > 0) {
      ctx.moveTo(properties.lastX, properties.lastY);
    }

    const fixedX = properties.lastX / (512 / 512);
    const fixedY = properties.lastY / (512 / 512);

    // const x = Math.ceil(properties.lastX / calcPixelSizeX) * calcPixelSizeX - calcPixelSizeX;
    // const y = Math.ceil(properties.lastY / calcPixelSizeY) * calcPixelSizeY - calcPixelSizeY;

    const x = Math.ceil(fixedX / calcPixelSizeX) * calcPixelSizeX - calcPixelSizeX;
    const y = Math.ceil(fixedY / calcPixelSizeY) * calcPixelSizeY - calcPixelSizeY;

    ctx.moveTo(x, y);
    ctx.fillStyle = properties.curColor;
    ctx.lineHeight = 0;
    ctx.fillRect(x, y, calcPixelSizeX, calcPixelSizeY);
  }
}

async function drawImageOnCanvas() {
  refreshCanvas();
  const url = `https://api.unsplash.com/photos/random?query=town,${searchField.value}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const image = new Image();
  image.crossOrigin = 'Anonymous';
  image.src = data.urls.small;
  image.onload = () => {
    let ratio = 0;
    const { width } = image;
    const { height } = image;
    let newWidth = width;
    let newHeight = height;
    let x = 0;
    let y = 0;

    if (width > canvas.width) {
      ratio = canvas.width / width;
      newHeight = height * ratio;
      newWidth = width * ratio;
    }

    if (height > canvas.height) {
      ratio = canvas.height / height;
      newHeight = height * ratio;
      newWidth = width * ratio;
    }

    // y = (canvas.height - height) / 2;
    // x = (canvas.width - width) / 2;

    y = (canvas.height - newHeight) / 2;
    x = (canvas.width - newWidth) / 2;

    ctx.drawImage(image, x, y, newWidth, newHeight);

    // ctx.drawImage(image, 0, 0, newWidth, newHeight);

    properties.isImgLoaded = true;
  };
}

function getPixel(imageData, x, y) {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1];
  }
  const offset = (y * imageData.width + x) * 4;
  return imageData.data.slice(offset, offset + 4);
}

function setPixel(imageData, x, y, color) {
  const offset = (y * imageData.width + x) * 4;
  imageData.data[offset + 0] = color[0];
  imageData.data[offset + 1] = color[1];
  imageData.data[offset + 2] = color[2];
  imageData.data[offset + 3] = 255;
}

function colorsMatch(a, b, rangeSq) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  const da = a[3] - b[3];
  return dr * dr + dg * dg + db * db + da * da < rangeSq;
}

function floodFill(context, x, y, fillColor, range = 1) {
  const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
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
    context.putImageData(imageData, 0, 0);
  }
}

function hexToRgbA(hex) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
  }
  throw new Error('Bad Hex');
}

function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function updateColors(color) {
  properties.prevColor = properties.curColor;
  properties.curColor = color;
  colorPickerWrapper.style.backgroundColor = properties.curColor;
  previousColor.querySelector('.color-sample').style.backgroundColor = properties.prevColor;
  currentColor.setAttribute('data-color', properties.curColor);
  previousColor.setAttribute('data-color', properties.prevColor);
}

function loadCanvas() {
  const dataURL = localStorage.getItem('canvas');
  if (dataURL) {
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
}

function updateCursor() {
  switch (properties.tool) {
    case 'pencil':
      canvas.style.cursor = 'url(assets/img/pencil.cur), default';
      break;
    case 'bucket':
      canvas.style.cursor = 'url(assets/img/paint-bucket.cur), default';
      break;
    case 'eyedropper':
      canvas.style.cursor = 'url(assets/img/eyedropper.cur), default';
      break;
    default:
      break;
  }
}

function toGreyScale() {
  if (properties.isImgLoaded) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imgData;

    for (let i = 0; i < data.length; i += 4) {
      const avgColor = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avgColor;
      data[i + 1] = avgColor;
      data[i + 2] = avgColor;
    }

    ctx.putImageData(imgData, 0, 0);
  } else {
    alertBox.classList.toggle('alert-popup--hidden');
    setTimeout(() => alertBox.classList.toggle('alert-popup--hidden'), 2000);
  }
}

function saveSession() {
  localStorage.setItem('canvas', canvas.toDataURL());
  localStorage.setItem('tool', properties.tool);
  localStorage.setItem('currentColor', properties.curColor);
  localStorage.setItem('previousColor', properties.prevColor);
  localStorage.setItem('isImageLoaded', properties.isImgLoaded);
}

function loadSession() {
  loadCanvas();
  properties.tool = localStorage.getItem('tool') || 'pencil';
  properties.curColor = localStorage.getItem('currentColor') || '#41f795';

  properties.prevColor = localStorage.getItem('previousColor') || '#ffa500';
  properties.isImgLoaded = localStorage.getItem('isImageLoaded');

  colorPickerWrapper.style.backgroundColor = properties.curColor;
  colorPicker.value = properties.curColor;
  previousColor.querySelector('.color-sample').style.backgroundColor = properties.prevColor;
  currentColor.setAttribute('data-color', properties.curColor);
  previousColor.setAttribute('data-color', properties.prevColor);

  updateCursor();
  toolItems.forEach((element) => {
    element.classList.remove('active');
    if (element.dataset.tool === properties.tool) {
      element.classList.add('active');
    }
  });
}

function updateSliderValue() {
  const values = ['128', '256', '512'];
  rangeBullet.innerHTML = values[rangeSlider.value];
  const bulletPosition = rangeSlider.value / rangeSlider.max;
  rangeBullet.style.left = `${bulletPosition * 490}px`;
}

toolItems.forEach((element) => {
  element.addEventListener('click', () => {
    if (element.classList.contains('active')) {
      return;
    }

    if (!element.classList.contains('disabled')) {
      toolItems.forEach((element) => element.classList.remove('active'));
      element.classList.add('active');
      properties.tool = element.dataset.tool;
      updateCursor();
    }
  });
});

paletteItems.forEach((element) => {
  element.addEventListener('click', () => {
    updateColors(element.dataset.color);
  });
});

canvas.addEventListener(
  'mousedown',
  (e) => {
    if (properties.tool === 'pencil') {
      properties.isMouseDown = true;
    }
    e.preventDefault();
  },
  false
);
canvas.addEventListener(
  'mousemove',
  (e) => {
    if (properties.tool === 'pencil') {
      [properties.lastX, properties.lastY] = [e.layerX, e.layerY];
      draw();
    }
  },
  false
);
canvas.addEventListener(
  'mouseup',
  (e) => {
    if (properties.tool === 'pencil') {
      properties.isMouseDown = false;
    }
    e.preventDefault();
  },
  false
);
canvas.addEventListener('mouseout', () => (properties.isMouseDown = false));
canvas.addEventListener('click', (e) => {
  if (properties.tool === 'bucket') {
    const color = hexToRgbA(properties.curColor);
    floodFill(ctx, e.layerX, e.layerY, color);
  }
  if (properties.tool === 'eyedropper') {
    const sampleColor = rgbToHex(...ctx.getImageData(e.layerX, e.layerY, 1, 1).data);
    updateColors(sampleColor);
  }
});

clearBtn.addEventListener('click', () => refreshCanvas());
loadBtn.addEventListener('click', () => drawImageOnCanvas());
greyScaleBtn.addEventListener('click', () => toGreyScale());

rangeSlider.addEventListener('input', updateSliderValue, false);

window.addEventListener('keypress', (e) => {
  if (['KeyB', 'KeyP', 'KeyC'].includes(e.code)) {
    toolItems.forEach((element) => element.classList.remove('active'));
    switch (e.code) {
      case 'KeyB':
        properties.tool = 'bucket';
        document.querySelector('[data-tool="bucket"]').classList.add('active');
        break;
      case 'KeyP':
        properties.tool = 'pencil';
        document.querySelector('[data-tool="pencil"]').classList.add('active');
        break;
      case 'KeyC':
        properties.tool = 'eyedropper';
        document.querySelector('[data-tool="eyedropper"]').classList.add('active');
        break;
      default:
    }
    updateCursor();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  loadSession();
});

window.addEventListener('beforeunload', saveSession);
