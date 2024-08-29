import { createDiaryItem } from './DOM-creation-functions-left-side.js';

export function formValidation(forAttribute, labelTextContent, inputType, maxLengthString, submitButton, prompt) {
  let form;

  // Check if a form already exists in the prompt
  form = prompt.querySelector('form');

  // If no form exists, create a new one
  if (!form) {
    form = document.createElement('form');
  }

  const promptLabel = document.createElement('label');
  promptLabel.setAttribute('for', forAttribute);
  promptLabel.textContent = labelTextContent;

  const input = document.createElement('input');
  input.id = forAttribute;
  input.name = forAttribute;
  input.type = inputType;

  Object.assign(input, {
    autocomplete: 'off',
    required: true,
    maxLength: maxLengthString,
  });

  if (inputType === 'textarea') {
    textareaCharCounter(input, prompt);
  }

  form.appendChild(promptLabel);
  form.appendChild(input);
  form.appendChild(submitButton);

  return form;
}

export function isFormValid(input, textarea, prompt, submitButton) {
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    input.checkValidity();
    textarea.checkValidity();
    if (input.checkValidity() && textarea.checkValidity()) {
      createDiaryItem(prompt, submitButton);
    } else {
      input.reportValidity() && textarea.reportValidity();
    }
  });
}

function textareaCharCounter(textarea, promptWindow) {
  textarea.setAttribute('maxlength', 80);
  const charCounter = document.createElement('p');
  charCounter.classList.add('char-counter');
  charCounter.textContent = `Max. Characters: ${textarea.value.length} / 80`;

  textarea.addEventListener('input', () => {
    const currentLength = textarea.value.length;
    charCounter.textContent = `Max. Characters: ${currentLength} / 80`;
  });

  promptWindow.appendChild(charCounter);
}
