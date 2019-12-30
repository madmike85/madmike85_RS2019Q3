import './utils/tooltips';
import { TAGS, NODES, PROPERTIES } from './config/config';

console.log(TAGS);
console.log(NODES);
console.log(PROPERTIES);

NODES.menuBtnHolder.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu-btn') && !e.target.classList.contains('selected')) {
    NODES.menu.classList.add('menu-shown');
    NODES.menuBtns.forEach((button) => button.classList.remove('selected'));
    e.target.classList.add('selected');
  } else if (e.target.classList.contains('selected')) {
    NODES.menu.classList.remove('menu-shown');
    NODES.menuBtns.forEach((button) => button.classList.remove('selected'));
  }

  if (e.target.classList.contains('resize-btn')) {
    NODES.resizeMenu.classList.add('menu-open');
    NODES.saveMenu.classList.remove('menu-open');
  }

  if (e.target.classList.contains('save-btn')) {
    NODES.resizeMenu.classList.remove('menu-open');
    NODES.saveMenu.classList.add('menu-open');
  }
});

NODES.cheatsheetBtn.addEventListener('click', () => NODES.modal.classList.add('open'));
NODES.modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal') || e.target.classList.contains('header__close')) {
    NODES.modal.classList.remove('open');
  }
});
