import {NODES} from '../config/config';

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