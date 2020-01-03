import { NODES, PROPERTIES } from '../config/config';

NODES.toolsGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('tools-grid__element')) {
    PROPERTIES.tool = e.target.dataset.tool;
    NODES.tools.forEach((tool) => tool.classList.remove('selected'));
    e.target.classList.add('selected');
  }
});

NODES.sizePanel.addEventListener('click', (e) => {
  if (e.target.classList.contains('size-panel__element')) {
    PROPERTIES.pixelSizeMult = parseInt(e.target.dataset.size, 10);
    NODES.sizeElements.forEach((element) => element.classList.remove('selected'));
    e.target.classList.add('selected');
  }
});
