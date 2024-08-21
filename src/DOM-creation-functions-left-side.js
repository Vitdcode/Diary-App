//libraries
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
//images
import { closeIcon, quoteIcon, diaryMenuIcon, deleteDiaryIcon, savedIcon } from './icons-creation-functions.js';
//functions for creating DOM elements
import {
  createBackdrop,
  createInputField,
  createFormLabel,
  createTextarea,
  createButton,
  createPromptWindow,
  createParagraph,
} from './reused-DOM-functions.js';
//other functions
import { closePrompt, deleteItemsFromLeftSide, deleteAndMenuIconHover, deleteDiary } from './ui-functions.js';
import { pushToDiariesArray, diaries } from './diary-list-handling.js';
import { createDiaryDetailsRightSide } from './DOM-creation-functions-right-side.js';
import { saveToLocalStorage, localStorageBackup } from './local-storage-handling';

export function createDiaryButtonInDom() {
  const leftSide = document.querySelector('.left-side');
  const createDiaryButtonWrapper = document.createElement('div');
  createDiaryButtonWrapper.classList.add('create-diary-button-wrapper');
  const createDiaryButton = createButton('create-diary-button', 'Create new Diary');
  createDiaryButtonWrapper.appendChild(createDiaryButton);
  leftSide.appendChild(createDiaryButtonWrapper);
  openNewDiaryPrompt(createDiaryButton);
}

function openNewDiaryPrompt(createDiaryButton) {
  const mainWrapper = document.querySelector('.main-wrapper');
  createDiaryButton.addEventListener('click', () => {
    const promptWindow = createPromptWindow('prompt-window');
    mainWrapper.appendChild(promptWindow);
    createPromptWindowElements();
  });
}

function createPromptWindowElements() {
  const prompt = document.querySelector('.prompt-window');
  //creating a backdrop div to darken the background if the prompt is open and make the background unresponsive until the prompt is closed
  const backdrop = createBackdrop();
  const promptHeadline = createParagraph('prompt-headline', 'Create a new Diary');
  const promptInputAndInputHeadlineWrapper = document.createElement('div');
  promptInputAndInputHeadlineWrapper.classList.add("prompt-input-and-input-headline-wrapper"); //prettier-ignore
  //creating all DOM Elements using functions in the reused-DOM-functions js file
  const inputLabel = createFormLabel('create-new-diary-input', 'Diary Name');
  const input = createInputField('create-new-diary-input');
  const diaryDescription = createTextarea('describe-your-diary');
  const diaryDescriptionLabel = createFormLabel('describe-your-diary', 'Describe your Diary');
  const createDiaryButton = createButton('create-diary-button-prompt', 'Create Diary');

  prompt.appendChild(promptHeadline);
  prompt.appendChild(closeIcon());
  promptInputAndInputHeadlineWrapper.appendChild(inputLabel);
  promptInputAndInputHeadlineWrapper.appendChild(input);
  promptInputAndInputHeadlineWrapper.appendChild(diaryDescriptionLabel);
  promptInputAndInputHeadlineWrapper.appendChild(diaryDescription);
  prompt.appendChild(promptInputAndInputHeadlineWrapper);
  prompt.appendChild(createDiaryButton);
  document.body.appendChild(backdrop);
  closePrompt(prompt);
  createDiaryItem(prompt, input, diaryDescription, createDiaryButton);
}

function createDiaryItem(prompt, input, diaryDescription, createDiaryButton) {
  if (prompt) {
    const leftSide = document.querySelector('.left-side');
    createDiaryButton.addEventListener('click', () => {
      if (input.value != '') {
        const diaryItemWrapper = document.createElement('div');
        diaryItemWrapper.id = uuidv4();
        diaryItemWrapper.classList.add('diary-item-wrapper');

        const deleteDiaryIconElement = deleteDiaryIcon();
        const diaryMenuIconElement = diaryMenuIcon(diaryItemWrapper);
        deleteAndMenuIconHover(diaryItemWrapper, deleteDiaryIconElement, diaryMenuIconElement);
        deleteDiaryPrompt(diaryItemWrapper, deleteDiaryIconElement);
        const diaryItemName = createParagraph('diary-item-name', input.value);
        const diaryDescriptionItem = createParagraph('diary-description-item', diaryDescription.value);

        diaryItemWrapper.appendChild(diaryMenuIconElement);
        diaryItemWrapper.appendChild(deleteDiaryIconElement);
        diaryItemWrapper.appendChild(diaryItemName);
        diaryItemWrapper.appendChild(quoteIcon());
        diaryItemWrapper.appendChild(diaryDescriptionItem);
        leftSide.appendChild(diaryItemWrapper);

        pushToDiariesArray(
          diaryItemName.textContent,
          diaryItemWrapper.id,
          diaryDescriptionItem.textContent,
          diaryTimestamp(diaryItemWrapper),
          [],
          [],
          'rgba(37, 139, 153, 0.7)'
        );
        editDiary(diaryItemWrapper.id, diaryMenuIconElement);
        createDiaryDetailsRightSide(diaryItemWrapper.id);
        saveToLocalStorage();
      } else {
        alert('Diary Name cannot be Empty');
      }
    });
  }
}

export function createDiariesFromLocalStorage() {
  diaries.forEach((diary) => {
    const leftSide = document.querySelector('.left-side');
    const diaryItemWrapper = document.createElement('div');
    diaryItemWrapper.id = diary.id;
    diaryItemWrapper.classList.add('diary-item-wrapper');
    const deleteDiaryIconElement = deleteDiaryIcon();
    const diaryMenuIconElement = diaryMenuIcon(diaryItemWrapper);
    editDiary(diary.id, diaryMenuIconElement);
    deleteDiaryPrompt(diaryItemWrapper, deleteDiaryIconElement);
    const diaryItemName = createParagraph('diary-item-name', diary.name);
    const diaryDescriptionItem = createParagraph('diary-description-item', diary.description);
    diaryTimestampFromLocalStorage(diaryItemWrapper, diary);

    diaryItemWrapper.appendChild(diaryMenuIconElement);
    deleteAndMenuIconHover(diaryItemWrapper, deleteDiaryIconElement, diaryMenuIconElement);
    diaryItemWrapper.appendChild(deleteDiaryIconElement);
    diaryItemWrapper.appendChild(diaryItemName);
    diaryItemWrapper.appendChild(quoteIcon());
    diaryItemWrapper.appendChild(diaryDescriptionItem);
    leftSide.appendChild(diaryItemWrapper);
    leftSide.appendChild(localStorageBackup());
    createDiaryDetailsRightSide(diary.id);
  });
}

function diaryTimestamp(diaryItemWrapper) {
  const timestamp = document.createElement('p');
  timestamp.classList.add('diary-timestamp');
  diaryItemWrapper.appendChild(timestamp);
  return (timestamp.textContent = `Created on: ${format(new Date(), 'dd-MM-yyyy')}`);
}

function diaryTimestampFromLocalStorage(diaryItemWrapper, diary) {
  const timestamp = document.createElement('p');
  timestamp.classList.add('diary-timestamp');
  timestamp.textContent = diary.timestamp;
  diaryItemWrapper.appendChild(timestamp);
}

function editDiary(diaryID, diaryMenuIconElement) {
  diaryMenuIconElement.addEventListener('click', () => {
    const mainWrapper = document.querySelector('.main-wrapper');
    const backdrop = createBackdrop();
    const inputAndTextWrapper = document.createElement('div');
    inputAndTextWrapper.classList.add('prompt-input-and-input-headline-wrapper');
    const editHeadlline = createParagraph('diary-edit-prompt-headline', 'Edit Diary');
    const editMenu = document.createElement('div');
    editMenu.classList.add('prompt-window');
    const textarea = createTextarea('describe-your-diary');
    const editdiaryDescriptionLabel = createFormLabel('describe-your-diary', 'Edit Diary Description');
    const inputLabel = createFormLabel('create-new-diary-input', 'Diary Name');
    const input = createInputField('create-new-diary-input');
    const editDiarySaveButton = createButton('create-diary-button-prompt', 'Save');
    const diary = diaries.find((item) => item.id === diaryID);
    if (diary) {
      input.value = diary.name;
      textarea.value = diary.description;
    }

    textareaCharCounter(textarea, editMenu);
    inputAndTextWrapper.appendChild(inputLabel);
    inputAndTextWrapper.appendChild(input);
    inputAndTextWrapper.appendChild(editdiaryDescriptionLabel);
    inputAndTextWrapper.appendChild(textarea);

    editMenu.appendChild(editHeadlline);
    editMenu.appendChild(closeIcon());
    editMenu.appendChild(inputAndTextWrapper);
    editMenu.appendChild(editDiarySaveButton);
    document.body.appendChild(backdrop);
    mainWrapper.appendChild(editMenu);

    closePrompt(editMenu);
    saveEditedDiary(editDiarySaveButton, diary, textarea, input, editMenu);
  });
}

function saveEditedDiary(editDiarySaveButton, diary, textarea, input, prompt) {
  editDiarySaveButton.addEventListener('click', () => {
    diary.name = input.value;
    diary.description = textarea.value;
    deleteItemsFromLeftSide();
    savedText(prompt, 'saved-icon-edit-diary-prompt', 'saved-text-diary-edit');
    saveToLocalStorage();
    createDiariesFromLocalStorage();
  });
}

export function savedText(prompt, iconClass, textClass) {
  const savedIconElement = savedIcon(iconClass);

  const savedText = document.createElement('p');
  savedText.classList.add(textClass);
  savedText.textContent = 'Saved';

  prompt.appendChild(savedIconElement);
  prompt.appendChild(savedText);

  setTimeout(() => {
    savedIconElement.classList.add('fade-out');
    savedText.classList.add('fade-out');
  }, 1000);

  setTimeout(() => {
    prompt.removeChild(savedIconElement);
    prompt.removeChild(savedText);
  }, 2000);
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

function deleteDiaryPrompt(diaryItemWrapper, deleteIcon) {
  deleteIcon.addEventListener('click', () => {
    const mainWrapper = document.querySelector('.main-wrapper');
    const backdrop = createBackdrop();
    const deletePromptWindow = document.createElement('div');
    deletePromptWindow.classList.add('delete-prompt-window');
    const deleteDiaryHeadline = createParagraph('delete-diary-headline', 'Do you want to delete this Diary?');
    const yesButton = createButton('yes-button', 'YES');
    const noButton = createButton('no-button', 'NO');
    document.body.appendChild(backdrop);
    deletePromptWindow.appendChild(deleteDiaryHeadline);
    deletePromptWindow.appendChild(yesButton);
    deletePromptWindow.appendChild(noButton);
    mainWrapper.appendChild(deletePromptWindow);
    deleteDiary(yesButton, noButton, diaryItemWrapper, backdrop, deletePromptWindow, mainWrapper);
  });
}
