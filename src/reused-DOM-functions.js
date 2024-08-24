import Quill from 'quill';
import 'quill/dist/quill.snow.css';
/* import { ImageDrop } from 'quill-image-drop-module'; */
import ResizeModule from '@ssumo/quill-resize-module';

Quill.register('modules/resize', ResizeModule);

/* Quill.register('modules/imageDrop', ImageDrop); */

/* import ImageCompress from 'quill-image-compress'; */
import DOMPurify from 'dompurify';

export function createBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  return backdrop;
}

export function createInputField(inputId) {
  const input = document.createElement('input');
  input.id = inputId;
  input.type = 'text';
  input.setAttribute('autocomplete', 'off');
  return input;
}

export function createFormLabel(forAttribute, textContent) {
  const promptLabel = document.createElement('label');
  promptLabel.setAttribute('for', forAttribute);
  promptLabel.textContent = textContent;
  return promptLabel;
}

export function createTextarea(textareaId) {
  const textarea = document.createElement('textarea');
  textarea.id = textareaId;
  return textarea;
}

export function createQuillEditor(quillWrapperId) {
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'], // Toggle buttons
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }], // Add color picker
    [{ align: [] }],
    ['image'],
    ['clean'], // Remove formatting button
  ];
  const quill = new Quill(`#${quillWrapperId}`, {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
      /*       imageDrop: true, */
      resize: {
        locale: {
          center: 'center',
        },
      },
    },
  });
  return quill;
}

export function createButton(className, textContent) {
  const button = document.createElement('button');
  button.classList.add(`${className}`);
  button.textContent = textContent;
  return button;
}

export function createPromptWindow(className) {
  const promptWindow = document.createElement('div');
  promptWindow.classList.add(`${className}`);
  return promptWindow;
}

export function createParagraph(className, textContent) {
  const paragraph = document.createElement('div');
  paragraph.classList.add(className);
  paragraph.innerHTML = DOMPurify.sanitize(textContent);
  return paragraph;
}
