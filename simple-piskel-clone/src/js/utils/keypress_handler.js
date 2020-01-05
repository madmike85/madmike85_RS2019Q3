import { NODES, PROPERTIES } from '../config/config';
import { addFrame, deleteFrame, copyFrame } from '../frame_roll/frame_roll';
import { swapColors } from '../color_swap/colorSwap';
import { fullscreenPreview } from '../preview/preview';

window.addEventListener('keypress', (e) => {
  const shortcut = PROPERTIES.currentShortcuts.find((x) => x.key === e.code) || null;
  if (!shortcut) return;

  if (shortcut.type === 'tool') {
    PROPERTIES.tool = shortcut.element;
    NODES.tools.forEach((tool) => {
      if (tool.dataset.tool === shortcut.element) {
        tool.classList.add('selected');
      } else {
        tool.classList.remove('selected');
      }
    });
  }

  if (shortcut.type === 'size') {
    if (shortcut.element === 'increase' && PROPERTIES.pixelSizeMult + 1 < 5) {
      PROPERTIES.pixelSizeMult += 1;
    } else if (shortcut.element === 'decrease' && PROPERTIES.pixelSizeMult - 1 > 0) {
      PROPERTIES.pixelSizeMult -= 1;
    }
    NODES.sizeElements.forEach((element) => {
      if (+element.dataset.size === PROPERTIES.pixelSizeMult) {
        element.classList.add('selected');
      } else {
        element.classList.remove('selected');
      }
    });
  }

  if (shortcut.type === 'frame') {
    if (shortcut.element === 'new') {
      addFrame();
    }
    if (shortcut.element === 'delete') {
      const idx = document.querySelector('.frame.selected').dataset.id;
      deleteFrame(idx);
    }
    if (shortcut.element === 'copy') {
      const idx = document.querySelector('.frame.selected').dataset.id;
      copyFrame(idx);
    }
  }

  if (shortcut.type === 'menu') {
    NODES.menu.classList.add('menu-shown');
    if (shortcut.element === 'resize') {
      document.querySelector('.resize-btn').classList.add('selected');
      document.querySelector('.save-btn').classList.remove('selected');
      NODES.resizeMenu.classList.add('menu-open');
      NODES.saveMenu.classList.remove('menu-open');
    }
    if (shortcut.element === 'save') {
      document.querySelector('.resize-btn').classList.remove('selected');
      document.querySelector('.save-btn').classList.add('selected');
      NODES.resizeMenu.classList.remove('menu-open');
      NODES.saveMenu.classList.add('menu-open');
    }
  }

  if (shortcut.type === 'color') {
    if (shortcut.element === 'swap') {
      swapColors();
    }
  }

  if (shortcut.type === 'screen') {
    if (shortcut.element === 'fullscreen') {
      fullscreenPreview();
    }
  }
});
