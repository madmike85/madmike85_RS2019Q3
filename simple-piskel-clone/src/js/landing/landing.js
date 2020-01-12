/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { NODES } from '../config/config';
import { loadSession } from '../utils/session';

NODES.createSpriteBtn.forEach((btn) =>
  btn.addEventListener('click', () => {
    NODES.editor.classList.add('shown');
    NODES.landing.classList.remove('shown');
    loadSession();
  }),
);
