import './utils/tooltips';
import './menu/menu';
import './main_canvas/canvas';
import './tools/tools';
import './color_swap/colorSwap';
import './frame_roll/frame_roll';
import './fps_slider/fps_slider';
import './preview/preview';
import './utils/keypress_handler';
import './modal/modal';
import './landing/landing';
import { NODES } from './config/config';
import { saveSession } from './utils/session';

// console.log(TAGS);
// console.log(NODES);
// console.log(PROPERTIES);

NODES.cheatsheetBtn.addEventListener('click', () => NODES.modal.classList.add('open'));
NODES.modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal') || e.target.classList.contains('header__close')) {
    NODES.modal.classList.remove('open');
  }
});

window.addEventListener('beforeunload', saveSession);
