/* eslint-disable import/prefer-default-export */
import { NODES, PROPERTIES } from '../config/config';

function swapColors() {
  [PROPERTIES.primary, PROPERTIES.secondary] = [PROPERTIES.secondary, PROPERTIES.primary];
  NODES.primaryColor.setAttribute('value', PROPERTIES.primary);
  NODES.secondaryColor.setAttribute('value', PROPERTIES.secondary);
  NODES.palletWrapper.querySelector('.primary-color').style.backgroundColor = PROPERTIES.primary;
  NODES.palletWrapper.querySelector('.secondary-color').style.backgroundColor =
    PROPERTIES.secondary;
}

NODES.palletWrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('color-switch-btn')) {
    swapColors();
  }
});

export { swapColors };
