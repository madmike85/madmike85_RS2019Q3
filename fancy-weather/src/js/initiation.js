import { controlBlock, weatherBlock, geolocationBlock } from './elements';

function createBlock(obj, root) {
  obj.forEach((o) => {
    const element = document.createElement(o.tag);

    if (o.classes) {
      element.classList.add(...o.classes);
    }
    if (o.attributes) {
      o.attributes.forEach((a) => {
        element.setAttribute(a[0], a[1]);
      });
    }

    if (o.innerHtml) {
      createBlock(o.innerHtml, element);
    }

    if (o.innerText) {
      element.innerText = o.innerText;
    }

    root.append(element);
  });
}

export default function initializeStructure() {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');

  createBlock(controlBlock, document.body);
  createBlock(weatherBlock, mainContainer);
  createBlock(geolocationBlock, mainContainer);
  document.body.append(mainContainer);
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
}
