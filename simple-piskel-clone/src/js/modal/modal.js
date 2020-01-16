/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
import { NODES, PROPERTIES } from '../config/config';

const _ = require('lodash');

function changeKeyBinding(key) {
  const idx = PROPERTIES.currentShortcuts.findIndex(
    (x) => x.element === PROPERTIES.selectedKeyBind.dataset.key
  );
  if (idx === -1) return;
  const shortcut = PROPERTIES.currentShortcuts[idx];
  shortcut.key = key;
  PROPERTIES.selectedKeyBind.innerText = key.toString().slice(-1);
  const sameShortcuts = PROPERTIES.currentShortcuts.filter((x) => x.key === key);
  if (sameShortcuts.length > 1) {
    const clone = sameShortcuts.find((x) => x !== PROPERTIES.currentShortcuts[idx]);
    const cloneElement = document.querySelector(`[data-key='${clone.element}']`);
    cloneElement.classList.add('error');
    cloneElement.innerText = '?';
  } else {
    PROPERTIES.selectedKeyBind.classList.remove('error');
  }
  PROPERTIES.selectedKeyBind = null;
}

function resetToDefaults() {
  PROPERTIES.currentShortcuts = _.cloneDeep(PROPERTIES.defaulShortcuts);
  const keyElements = document.querySelectorAll('[data-key]');
  keyElements.forEach((element) => {
    const defaultShortcut = PROPERTIES.currentShortcuts.find(
      (x) => x.element === element.dataset.key
    );
    element.innerText = defaultShortcut.key.toString().slice(-1);
  });
}

NODES.modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('shortcut-value')) {
    NODES.shortcutValues.forEach((item) => {
      if (item !== e.target) {
        item.classList.remove('edit');
      }
    });
    e.target.classList.toggle('edit');
    PROPERTIES.selectedKeyBind = e.target;
    PROPERTIES.isKeyEdit = !PROPERTIES.isKeyEdit;
  }
});

NODES.restoreDefault.addEventListener('click', () => {
  resetToDefaults();
});

window.addEventListener('keypress', (e) => {
  if (PROPERTIES.isKeyEdit) {
    changeKeyBinding(e.code);
  }

  NODES.shortcutValues.forEach((item) => {
    item.classList.remove('edit');
  });
  PROPERTIES.isKeyEdit = false;
});
