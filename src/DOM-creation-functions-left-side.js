//libraries
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
//images
import {
  quoteIcon,
  diaryMenuIcon,
  deleteDiaryIcon,
  closeAnimation,
  menuAnimation,
  savedIconAnimated,
} from './icons-creation-functions.js';
//functions for creating DOM elements
import { createBackdrop, createButton, createPromptWindow, createParagraph } from './reused-DOM-functions.js';
//other functions
import {
  closePrompt,
  deleteItemsFromLeftSide,
  deleteAndMenuIconHover,
  deleteDiary,
  monthCollapsible,
  yearCollapsible,
  pinnedCollapsibale,
} from './ui-functions.js';
import { pushToDiariesArray, diaries } from './diary-list-handling.js';
import { createDiaryDetailsRightSide } from './DOM-creation-functions-right-side.js';
import { saveToLocalStorage, localStorageBackup } from './local-storage-handling';
import { formValidation, isFormValid } from './form-validation.js';

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
  const createDiaryButton = createButton('create-diary-button-prompt', 'Create Diary');
  const formDiaryName = formValidation(
    'create-new-diary-input',
    'Diary Name',
    'text',
    '20',
    createDiaryButton,
    promptInputAndInputHeadlineWrapper
  );
  promptInputAndInputHeadlineWrapper.appendChild(formDiaryName);
  const formDiaryDescription = formValidation(
    'describe-your-diary',
    'Describe your Diary',
    'textarea',
    '80',
    createDiaryButton,
    promptInputAndInputHeadlineWrapper
  );
  promptInputAndInputHeadlineWrapper.appendChild(formDiaryDescription);
  prompt.appendChild(promptHeadline);
  closeAnimation(prompt);
  prompt.appendChild(promptInputAndInputHeadlineWrapper);
  document.body.appendChild(backdrop);
  closePrompt(prompt);
  isFormValid(
    document.getElementById('create-new-diary-input'),
    document.getElementById('describe-your-diary'),
    createDiaryButton,
    createDiaryItem.bind(null, prompt) //using bind to pass on the function with the needed argument without invoking the function createDiaryItem
  );
}

export function createDiaryItem(prompt) {
  if (prompt) {
    const leftSide = document.querySelector('.left-side');
    const input = document.getElementById('create-new-diary-input');
    const diaryDescription = document.getElementById('describe-your-diary');
    const diaryItemWrapper = document.createElement('div');
    diaryItemWrapper.id = uuidv4();
    diaryItemWrapper.classList.add('diary-item-wrapper');
    leftSide.appendChild(diaryItemWrapper);
    const diaryMenuIconElement = diaryMenuIcon(diaryItemWrapper);
    const diaryItemName = createParagraph('diary-item-name', input.value);
    const diaryDescriptionItem = createParagraph('diary-description-item', diaryDescription.value);
    diaryItemWrapper.appendChild(diaryMenuIconElement);
    const deleteDiaryIconAnimated = deleteDiaryIcon(diaryItemWrapper);
    diaryItemWrapper.appendChild(diaryItemName);
    diaryItemWrapper.appendChild(quoteIcon());
    diaryItemWrapper.appendChild(diaryDescriptionItem);
    deleteDiaryPrompt(diaryItemWrapper, deleteDiaryIconAnimated);
    deleteAndMenuIconHover(diaryItemWrapper, deleteDiaryIconAnimated, diaryMenuIconElement);
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
  }
}

export function createDiariesFromLocalStorage() {
  pinnedCollapsibale();
  yearCollapsible();
  monthCollapsible();
  printElementsLeftSide();
}

function printElementsLeftSide() {
  diaries.forEach((diary) => {
    const leftSide = document.querySelector('.left-side');
    const diaryItemWrapper = document.createElement('div');
    diaryItemWrapper.id = diary.id;
    diaryItemWrapper.classList.add('diary-item-wrapper');
    leftSide.appendChild(diaryItemWrapper);
    const diaryMenuIconAnimated = menuAnimation(diaryItemWrapper, diaryItemWrapper.id, 'menu-icon-edit-diary');
    editDiary(diary.id, diaryMenuIconAnimated);
    const diaryItemName = createParagraph('diary-item-name', diary.name);
    const diaryDescriptionItem = createParagraph('diary-description-item', diary.description);
    diaryTimestampFromLocalStorage(diaryItemWrapper, diary);
    const deleteDiaryIconAnimated = deleteDiaryIcon(diaryItemWrapper);
    deleteAndMenuIconHover(diaryItemWrapper, deleteDiaryIconAnimated, diaryMenuIconAnimated);
    diaryItemWrapper.appendChild(diaryItemName);
    diaryItemWrapper.appendChild(quoteIcon());
    diaryItemWrapper.appendChild(diaryDescriptionItem);
    deleteDiaryPrompt(diaryItemWrapper, deleteDiaryIconAnimated);
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
    const editMenu = document.createElement('div');
    editMenu.classList.add('prompt-window');
    const inputAndTextWrapper = document.createElement('div');
    inputAndTextWrapper.classList.add('prompt-input-and-input-headline-wrapper');
    const editHeadlline = createParagraph('diary-edit-prompt-headline', 'Edit Diary');
    editMenu.appendChild(editHeadlline);
    const editDiarySaveButton = createButton('create-diary-button-prompt', 'Save');
    editMenu.appendChild(editDiarySaveButton);
    const formDiaryName = formValidation(
      'create-new-diary-input',
      'Diary Name',
      'text',
      '20',
      editDiarySaveButton,
      inputAndTextWrapper
    );
    inputAndTextWrapper.appendChild(formDiaryName);
    const formDiaryDescription = formValidation(
      'describe-your-diary',
      'Describe your Diary',
      'textarea',
      '80',
      editDiarySaveButton,
      inputAndTextWrapper
    );
    inputAndTextWrapper.appendChild(formDiaryDescription);
    editMenu.appendChild(inputAndTextWrapper);
    mainWrapper.appendChild(editMenu);

    const diary = diaries.find((item) => item.id === diaryID);
    const input = document.getElementById('create-new-diary-input');
    const textarea = document.getElementById('describe-your-diary');
    if (diary) {
      input.value = diary.name;
      textarea.value = diary.description;
    }
    isFormValid(input, textarea, editDiarySaveButton, saveEditedDiary.bind(null, diary, textarea, input, editMenu));
    closeAnimation(editMenu);
    document.body.appendChild(backdrop);
    closePrompt(editMenu);
  });
}

export function saveEditedDiary(diary, textarea, input, prompt) {
  diary.name = input.value;
  diary.description = textarea.value;
  deleteItemsFromLeftSide();
  savedIconAnimated(prompt, 'saved-animated-icon-edit-diary');
  saveToLocalStorage();
  printElementsLeftSide();
}

function deleteDiaryPrompt(diaryItemWrapper, deleteDiaryIconAnimated) {
  deleteDiaryIconAnimated.addEventListener('click', () => {
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
