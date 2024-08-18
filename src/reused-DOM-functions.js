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
  const promptInput = document.createElement('input');
  promptInput.id = inputId;
  promptInput.type = 'text';
  promptInput.setAttribute('autocomplete', 'off');
  return promptInput;
}

export function createInputFieldLabel(forAttribute, textContent) {
  const promptLabel = document.createElement('label');
  promptLabel.setAttribute('for', forAttribute);
  promptLabel.textContent = textContent;
  return promptLabel;
}

/* 
promptHeadline.classList.add('prompt-headline');
promptHeadline.textContent = 'Create a new Diary'; */
