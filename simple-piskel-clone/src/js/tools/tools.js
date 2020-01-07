/* eslint-disable import/prefer-default-export */
import { NODES, PROPERTIES } from '../config/config';

function updateCursor() {
  switch (PROPERTIES.tool) {
    case 'pencil':
      NODES.mainCanvas.style.cursor = 'url(assets/img/pencil.cur), default';
      break;
    case 'line':
      NODES.mainCanvas.style.cursor = 'url(assets/img/lightstroke_alt.ani), default';
      break;
    case 'bucket':
    case 'bucket-color':
      NODES.mainCanvas.style.cursor = 'url(assets/img/paint-bucket.cur), default';
      break;
    case 'eraser':
      NODES.mainCanvas.style.cursor = 'url(assets/img/eraser.cur), default';
      break;
    case 'eyedropper':
      NODES.mainCanvas.style.cursor = 'url(assets/img/eyedropper_alt.cur), default';
      break;
    default:
      break;
  }
}

NODES.toolsGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('tools-grid__element')) {
    PROPERTIES.tool = e.target.dataset.tool;
    NODES.tools.forEach((tool) => tool.classList.remove('selected'));
    e.target.classList.add('selected');
    updateCursor();
  }
});

NODES.sizePanel.addEventListener('click', (e) => {
  if (e.target.classList.contains('size-panel__element')) {
    PROPERTIES.pixelSizeMult = parseInt(e.target.dataset.size, 10);
    NODES.sizeElements.forEach((element) => element.classList.remove('selected'));
    e.target.classList.add('selected');
  }
});

export { updateCursor };
