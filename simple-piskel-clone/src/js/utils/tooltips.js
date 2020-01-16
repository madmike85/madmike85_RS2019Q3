import tippy from 'tippy.js';

tippy('.sizes-panel', {
  content: 'Pen size from 1 to 4 pixels',
  placement: 'top',
  arrow: true,
  theme: 'black',
});

tippy('[data-tool="pencil"]', {
  content: '<p>Pen tool <span class="hotkey">(P)</span></p>',
  placement: 'right',
  arrow: true,
  theme: 'black',
});

tippy('[data-tool="line"]', {
  content: '<p>Stroke tool <span class="hotkey">(L)</span></p>',
  placement: 'right',
  arrow: true,
  theme: 'black',
});

tippy('[data-tool="bucket"]', {
  content: '<p>Paint bucket tool <span class="hotkey">(B)</span></p>',
  placement: 'right',
  arrow: true,
  theme: 'black',
});

tippy('[data-tool="bucket-color"]', {
  content: '<p>Paint all pixels of the same color <span class="hotkey">(A)</span></p>',
  placement: 'right',
  arrow: true,
  theme: 'black',
});

tippy('[data-tool="eraser"]', {
  content: '<p>Eraser tool <span class="hotkey">(E)</span></p>',
  placement: 'right',
  arrow: true,
  theme: 'black',
});

tippy('[data-tool="eyedropper"]', {
  content: '<p>Color picker <span class="hotkey">(O)</span></p>',
  placement: 'right',
  arrow: true,
  theme: 'black',
});

tippy('.color-switch-btn', {
  content: '<p>Swap colors <span class="hotkey">(X)</span></p>',
  placement: 'right',
  arrow: true,
  theme: 'black',
});

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

tippy('.fullscreen-btn', {
  content: '<p>Open in fullscreen mode <span class="hotkey">(F)</span></p>',
  placement: 'bottom',
  arrow: true,
  theme: 'black',
});

tippy('.resize-btn', {
  content: '<p>Resize canvas <span class="hotkey">(R)</span></p>',
  placement: 'left',
  arrow: true,
  theme: 'black',
});

tippy('.save-btn', {
  content: '<p>Save into file <span class="hotkey">(S)</span></p>',
  placement: 'left',
  arrow: true,
  theme: 'black',
});

tippy('.cheatsheet-btn', {
  content: 'Keyboard shortcuts',
  placement: 'right',
  arrow: true,
  theme: 'black',
});

tippy('.shortcut-value', {
  content: 'Click to edit the key',
  placement: 'top',
  arrow: true,
  theme: 'black',
});

tippy('.primary-color-picker', {
  content: 'Primary - left mouse button',
  placement: 'right',
  arrow: true,
  theme: 'black',
});

tippy('.secondary-color-picker', {
  content: 'Secondary - right mouse button',
  placement: 'right',
  arrow: true,
  theme: 'black',
});
