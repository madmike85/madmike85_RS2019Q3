/* eslint-disable indent */
import tippy from 'tippy.js';
import { PROPERTIES, NODES, TAGS } from '../config/config';

function generateFrameRoll() {
  NODES.framesRollContainer.innerHTML = '';
  PROPERTIES.frames.forEach((_, i) => {
    const frameTemplate = `
        <div class="frame" draggable="true" data-id="${i}">
            <canvas class="frame__tile"></canvas>
            <div class="frame__number">${i + 1}</div>
            <div class="frame__btn-holder">
              ${
                PROPERTIES.frames.length > 1
                  ? '<div class="frame__btn frame__delete-btn"></div>'
                  : ''
              }
              ${
                PROPERTIES.frames.length > 1 ? '<div class="frame__btn frame__move-btn"></div>' : ''
              }
              <div class="frame__btn frame__copy-btn"></div>
            </div>
          </div>
        `;
    NODES.framesRollContainer.insertAdjacentHTML('beforeend', frameTemplate);
    tippy('.frame__delete-btn', {
      content: '<p>Delete this frame <span class="hotkey">(D)</span></p>',
      placement: 'bottom',
      arrow: true,
      theme: 'black',
    });

    tippy('.frame__copy-btn', {
      content: '<p>Copy this frame <span class="hotkey">(C)</span></p>',
      placement: 'bottom',
      arrow: true,
      theme: 'black',
    });

    tippy('.add-frame-btn', {
      content: '<p>Add new frame <span class="hotkey">(N)</span></p>',
      placement: 'bottom',
      arrow: true,
      theme: 'black',
    });
  });
}

function addFrame() {
  PROPERTIES.frames.push({
    data: null,
    context: null,
  });
  generateFrameRoll();
}

function deleteFrame(id) {
  PROPERTIES.frames.splice(id, 1);
  generateFrameRoll();
}

function copyFrame(id) {
  const frame = PROPERTIES.frames[id];
  PROPERTIES.frames.splice(id, 0, frame);
  generateFrameRoll();
}

NODES.addFrameBtn.addEventListener('click', () => {
  addFrame();
});

NODES.framesRollContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('frame__tile')) {
    const frames = document.querySelectorAll(TAGS.frames);
    frames.forEach((frame) => {
      frame.classList.remove('selected');
    });
    e.target.parentNode.classList.add('selected');
  }
  if (e.target.classList.contains('frame__delete-btn')) {
    const { id } = e.target.parentNode.parentNode.dataset.id;
    deleteFrame(id);
  }
  if (e.target.classList.contains('frame__copy-btn')) {
    const { id } = e.target.parentNode.parentNode.dataset.id;
    copyFrame(id);
  }
});

window.addEventListener('load', () => {
  generateFrameRoll();
});
