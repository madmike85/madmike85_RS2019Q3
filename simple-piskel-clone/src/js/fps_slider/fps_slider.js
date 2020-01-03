import { NODES } from '../config/config';

NODES.frameSliderRange.addEventListener('input', () => {
  NODES.frameSliderLable.innerHTML = `${NODES.frameSliderRange.value} FPS`;
});
