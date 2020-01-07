/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable indent */
import tippy from 'tippy.js';
import { PROPERTIES, NODES, TAGS } from '../config/config';
import { clearCanvas, loadDataFromSelectedFrame } from '../main_canvas/canvas';

let framesList;
let source;

function getFramesCanvasContext() {
  const frames = document.querySelectorAll('.frame__tile');
  frames.forEach((frame, i) => {
    const context = frame.getContext('2d');
    context.imageSmoothingEnabled = false;
    PROPERTIES.frames[i].context = context;
    PROPERTIES.frames[i].canvas = frame;
  });
}

function putDataToContext() {
  const frames = document.querySelectorAll('.frame__tile');
  frames.forEach((_, i) => {
    if (PROPERTIES.frames[i].data) {
      PROPERTIES.frames[i].context.putImageData(PROPERTIES.frames[i].data, 0, 0);
    }
  });
}

function generateFrameRoll() {
  NODES.framesRollContainer.innerHTML = '';
  PROPERTIES.frames.forEach((_, i) => {
    const frameTemplate = `
        <div class="frame ${
          i === PROPERTIES.currentFrameId ? 'selected' : ''
        }" draggable="true" data-id="${i}">
            <canvas id="${i}" class="frame__tile"></canvas>
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
  });
  framesList = document.querySelectorAll(TAGS.frames);
  framesList.forEach((item) => {
    item.addEventListener('dragstart', dragStarted, false);
    item.addEventListener('dragover', draggingOver, false);
    item.addEventListener('dragleave', draggingLeave, false);
    item.addEventListener('drop', dropped, false);
  });
  getFramesCanvasContext();
  putDataToContext();
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
}

function addFrame() {
  PROPERTIES.frames.push({
    context: null,
    canvas: null,
    data: null,
    frameData: null,
  });
  PROPERTIES.currentFrameId = PROPERTIES.frames.length - 1;
  clearCanvas();
  generateFrameRoll();
}

function deleteFrame(id) {
  PROPERTIES.frames.splice(id, 1);
  generateFrameRoll();
}

function copyFrame(id) {
  const frameToCopy = PROPERTIES.frames[id];
  const frame = {
    context: null,
    canvas: null,
    data: frameToCopy.data,
    frameData: frameToCopy.frameData,
  };
  PROPERTIES.frames.splice(id + 1, 0, frame);
  generateFrameRoll();
}

function updateFrame() {
  const selectedFrameCanvas = PROPERTIES.frames[PROPERTIES.currentFrameId].canvas;
  const canvasImage = NODES.mainCanvas;
  const { width, height } = canvasImage;
  const selectedWidth = selectedFrameCanvas.width;
  const selectedHeight = selectedFrameCanvas.height;
  PROPERTIES.frames[PROPERTIES.currentFrameId].context.clearRect(
    0,
    0,
    selectedWidth,
    selectedHeight
  );
  PROPERTIES.frames[PROPERTIES.currentFrameId].context.drawImage(
    canvasImage,
    0,
    0,
    width,
    height,
    0,
    0,
    selectedWidth,
    selectedHeight
  );
  PROPERTIES.frames[PROPERTIES.currentFrameId].data = PROPERTIES.frames[
    PROPERTIES.currentFrameId
  ].context.getImageData(0, 0, selectedWidth, selectedHeight);
}

function dragStarted(evt) {
  source = evt.target;
  evt.dataTransfer.setData('text/plain', evt.target.dataset.id);
  evt.dataTransfer.effectAllowed = 'move';
  source.classList.add('drag-start');
}

function draggingOver(evt) {
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'move';
}

function draggingLeave(evt) {
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'move';
}

function dropped(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  const sid = evt.dataTransfer.getData('text/plain');
  const tid = evt.target.parentNode.dataset.id;

  [PROPERTIES.frames[sid], PROPERTIES.frames[tid]] = [
    PROPERTIES.frames[tid],
    PROPERTIES.frames[sid],
  ];

  framesList.forEach((item) => item.classList.remove('drag-start'));
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
    PROPERTIES.currentFrameId = e.target.parentNode.dataset.id;
    loadDataFromSelectedFrame();
  }
  if (e.target.classList.contains('frame__delete-btn')) {
    const { id } = e.target.parentNode.parentNode.dataset.id;
    deleteFrame(id);
  }
  if (e.target.classList.contains('frame__copy-btn')) {
    const idx = e.target.parentNode.parentNode.dataset.id;
    copyFrame(idx);
  }
});

export { updateFrame, addFrame, deleteFrame, copyFrame, generateFrameRoll };
