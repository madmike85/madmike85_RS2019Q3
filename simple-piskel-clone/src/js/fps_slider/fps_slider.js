import { NODES, PROPERTIES } from '../config/config';

NODES.frameSliderRange.addEventListener('input', () => {
  NODES.frameSliderLable.innerHTML = `${NODES.frameSliderRange.value} FPS`;
  PROPERTIES.fps = parseInt(NODES.frameSliderRange.value, 10);
});
