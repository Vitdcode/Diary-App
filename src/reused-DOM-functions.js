import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import ResizeModule from '@ssumo/quill-resize-module';
Quill.register('modules/resize', ResizeModule);
import ImageCompress from 'quill-image-compress';
Quill.register('modules/imageCompress', ImageCompress);
import QuillPasteSmart from 'quill-paste-smart';
Quill.register('modules/pasteSmart', QuillPasteSmart);
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
    ['blockquote'],
    ['link'],
    ['image'],
    ['clean'], // Remove formatting button
  ];
  const quill = new Quill(`#${quillWrapperId}`, {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
      resize: {
        locale: {
          locale: {
            floatLeft: 'left',
            floatRight: 'right',
            center: 'center',
            restore: 'restore',
            altTip: 'Press and hold alt to lock ratio!',
            inputTip: 'Press enter key to apply change!',
          },
        },
      },
      imageCompress: {
        quality: 0.7, // default
        maxWidth: 1000, // default
        maxHeight: 1000, // default
        imageType: 'image/jpeg', // default
        debug: true, // default
        suppressErrorLogging: false, // default
        handleOnPaste: true, //default
        insertIntoEditor: undefined, // default
      },
      pasteSmart: {},
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
