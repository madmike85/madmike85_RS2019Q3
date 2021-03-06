/* eslint-disable operator-linebreak */
import { PROPERTIES, NODES } from '../config/config';
import { generateFrameRoll } from '../frame_roll/frame_roll';
import { updateCursor } from '../tools/tools';
import { updateColors } from '../color_swap/colorSwap';

const _ = require('lodash');

function saveSession() {
  localStorage.setItem('tool', PROPERTIES.tool);
  localStorage.setItem('primaryColor', PROPERTIES.primary);
  localStorage.setItem('secondaryColor', PROPERTIES.secondary);
  localStorage.setItem('fps', PROPERTIES.fps);
  localStorage.setItem('pixelSizeMult', PROPERTIES.pixelSizeMult);
  localStorage.setItem('canvasSize', PROPERTIES.canvasHeight);
  localStorage.setItem('shortcuts', JSON.stringify(PROPERTIES.currentShortcuts));
}

function loadSession() {
  PROPERTIES.tool = localStorage.getItem('tool') || 'pencil';
  PROPERTIES.primary = localStorage.getItem('primaryColor') || '#ffd700';
  PROPERTIES.secondary = localStorage.getItem('secondaryColor') || '#ea2708';
  PROPERTIES.fps = +localStorage.getItem('fps') || 24;
  NODES.frameSliderRange.value = PROPERTIES.fps;
  NODES.frameSliderLable.innerHTML = `${NODES.frameSliderRange.value} FPS`;
  PROPERTIES.pixelSizeMult = +localStorage.getItem('pixelSizeMult') || 1;
  PROPERTIES.canvasHeight = +localStorage.getItem('canvasSize') || 32;
  PROPERTIES.canvasWidth = +localStorage.getItem('canvasSize') || 32;
  PROPERTIES.currentShortcuts =
    JSON.parse(localStorage.getItem('shortcuts')) || _.cloneDeep(PROPERTIES.defaulShortcuts);

  NODES.tools.forEach((tool) => {
    if (tool.dataset.tool === PROPERTIES.tool) {
      tool.classList.add('selected');
    } else {
      tool.classList.remove('selected');
    }
  });

  NODES.sizeElements.forEach((element) => {
    if (+element.dataset.size === PROPERTIES.pixelSizeMult) {
      element.classList.add('selected');
    } else {
      element.classList.remove('selected');
    }
  });

  NODES.mainCanvas.width = PROPERTIES.canvasWidth;
  NODES.mainCanvas.height = PROPERTIES.canvasHeight;
  NODES.previewCanvas.width = PROPERTIES.canvasWidth;
  NODES.previewCanvas.height = PROPERTIES.canvasHeight;
  generateFrameRoll();

  updateCursor();
  updateColors();
}

export { saveSession, loadSession };
