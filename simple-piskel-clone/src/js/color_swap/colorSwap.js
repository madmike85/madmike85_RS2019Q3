/* eslint-disable operator-linebreak */
/* eslint-disable import/prefer-default-export */
import { NODES, PROPERTIES } from '../config/config';

function updateColors() {
  NODES.primaryColor.setAttribute('value', PROPERTIES.primary);
  NODES.secondaryColor.setAttribute('value', PROPERTIES.secondary);
  NODES.palletWrapper.querySelector('.primary-color').style.backgroundColor = PROPERTIES.primary;
  NODES.palletWrapper.querySelector('.secondary-color').style.backgroundColor =
    PROPERTIES.secondary;
}

function swapColors() {
  [PROPERTIES.primary, PROPERTIES.secondary] = [PROPERTIES.secondary, PROPERTIES.primary];
  updateColors();
}

NODES.palletWrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('color-switch-btn')) {
    swapColors();
  }
});

NODES.primaryColor.addEventListener('input', () => {
  PROPERTIES.primary = NODES.primaryColor.value;
  NODES.palletWrapper.querySelector('.primary-color').style.backgroundColor = PROPERTIES.primary;
});

NODES.secondaryColor.addEventListener('input', () => {
  PROPERTIES.secondary = NODES.secondaryColor.value;
  NODES.palletWrapper.querySelector('.primary-color').style.backgroundColor = PROPERTIES.secondary;
});

export { swapColors, updateColors };
