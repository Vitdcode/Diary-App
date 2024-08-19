export function createBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  return backdrop;
}

export function headline(headlineText, className) {
  const headline = document.createElement('p');
  headline.classList.add(className);
  headline.textContent = headlineText;
  return headline;
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
  const paragraph = document.createElement('p');
  paragraph.classList.add(className);
  paragraph.textContent = textContent;
  return paragraph;
}
