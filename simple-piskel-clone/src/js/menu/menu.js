/* eslint-disable operator-linebreak */
import { NODES, PROPERTIES } from '../config/config';

const context = NODES.mainCanvas.getContext('2d');

const UPNG = require('upng-js');
const download = require('downloadjs');

function saveAsAPNG(name) {
  const delays = new Array(PROPERTIES.frames.length).fill(500);
  const framesData = PROPERTIES.frames.map((x) => x.frameData.data.buffer);
  console.log(framesData);
  const result = UPNG.encode(framesData, 32, 32, 0, delays);
  download(result, `${name}.apng`, 'apng');
}

function resize() {
  const canvasData = context.getImageData(0, 0, NODES.mainCanvas.width, NODES.mainCanvas.height);
  NODES.mainCanvas.width = PROPERTIES.canvasWidth;
  NODES.mainCanvas.height = PROPERTIES.canvasHeight;
  NODES.previewCanvas.width = PROPERTIES.canvasWidth;
  NODES.previewCanvas.height = PROPERTIES.canvasHeight;
  context.putImageData(canvasData, 0, 0);
}

NODES.menuBtnHolder.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu-btn') && !e.target.classList.contains('selected')) {
    NODES.menu.classList.add('menu-shown');
    NODES.menuBtns.forEach((button) => button.classList.remove('selected'));
    e.target.classList.add('selected');
  } else if (e.target.classList.contains('selected')) {
    NODES.menu.classList.remove('menu-shown');
    NODES.menuBtns.forEach((button) => button.classList.remove('selected'));
  }

  if (e.target.classList.contains('resize-btn')) {
    NODES.resizeMenu.classList.add('menu-open');
    NODES.saveMenu.classList.remove('menu-open');
  }

  if (e.target.classList.contains('save-btn')) {
    NODES.resizeMenu.classList.remove('menu-open');
    NODES.saveMenu.classList.add('menu-open');
  }
});

NODES.menu.addEventListener('click', (e) => {
  if (e.target.classList.contains('preset-action')) {
    NODES.presets.forEach((preset) => {
      if (preset.checked) {
        PROPERTIES.canvasWidth = preset.dataset.preset;
        PROPERTIES.canvasHeight = preset.dataset.preset;
        resize();
      }
    });
  }

  if (e.target.classList.contains('resize-action')) {
    if (
      NODES.widthInput.value.length > 0 &&
      NODES.heightInput.value.length > 0 &&
      /[0-9]+/.test(NODES.widthInput.value) &&
      /[0-9]+/.test(NODES.heightInput.value)
    ) {
      PROPERTIES.canvasWidth = NODES.widthInput.value;
      PROPERTIES.canvasHeight = NODES.heightInput.value;
      resize();
    }
  }

  if (e.target.classList.contains('apng-save__btn')) {
    const name = NODES.saveInput.value;
    saveAsAPNG(name);
  }
});

NODES.widthInput.addEventListener('keyup', () => {
  NODES.heightInput.value = NODES.widthInput.value;
});

NODES.heightInput.addEventListener('keyup', () => {
  NODES.widthInput.value = NODES.heightInput.value;
});
