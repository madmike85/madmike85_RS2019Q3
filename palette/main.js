const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnable = false;

const toolItems = document.querySelectorAll('.tool-item');

toolItems.forEach(element => {
  element.addEventListener('click', e => {
    if (element.classList.contains('active')) {
      return;
    } else if (!element.classList.contains('disabled')) {
      toolItems.forEach(element => element.classList.remove('active'));
      element.classList.add('active');
    }
  });
});
