//libraries
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
//icons
import {
  closeIcon,
  quoteIcon,
  profilePic,
  speechBubble,
  pinnedIconSelected,
  pinnedIconNotSelected,
  pinnedDiaryEntriesIcons,
} from './icons-creation-functions.js';
//functions for creating DOM elements
import {
  createBackdrop,
  createFormLabel,
  createTextarea,
  createButton,
  createPromptWindow,
  createParagraph,
} from './reused-DOM-functions.js';
//other functions
import { diaries } from './diary-list-handling';
import {
  closePrompt,
  yearCollapsible,
  deleteDiaryEntry,
  addingHeightToCollapsableMenu,
  monthCollapsible,
} from './ui-functions';
import { savedText } from './DOM-creation-functions-left-side';
import { saveToLocalStorage } from './local-storage-handling';

export function createDiaryDetailsRightSide(diaryID) {
  const rightSide = document.querySelector('.right-side');

  const diaryId = document.getElementById(diaryID);
  diaryId.addEventListener('click', () => {
    rightSide.innerHTML = '';
    const diary = diaries.find((item) => item.id === diaryID);
    if (diary) {
      const rightSideHeadline = createParagraph('right-side-headline', diary.name);
      rightSide.appendChild(rightSideHeadline);

      createNewEntryButton(rightSide, diary);
      colorPickerEntries(rightSide, diary);

      const diariesItemWrapper = document.querySelectorAll('.diary-item-wrapper');
      diariesItemWrapper.forEach((diary) => {
        diary.style.boxShadow = 'none';
      });
      diaryId.style.boxShadow = '0px 0px 10px 0px #6366f1';

      const pinnedCollapsableMenu = createParagraph('pinned-collapsable-menu-text', 'Pinned Entries');
      pinnedCollapsableMenu.appendChild(pinnedIconSelected('pinned-inside-collapsable-menu-icon'));
      rightSide.appendChild(pinnedCollapsableMenu);

      let uniqueYears = new Set();
      let uniqueMonths = new Set();
      diary.entries.forEach((entry) => {
        uniqueYears.add(entry.year);
        uniqueMonths.add(entry.month);
      });
      uniqueYears.forEach((year) => {
        const printYearRightSide = createParagraph('year-text', year);
        printYearRightSide.id = `year-text-${year}`;
        rightSide.appendChild(printYearRightSide);

        const entriesWrapper = document.createElement('div');
        entriesWrapper.classList.add('diary-entries-wrapper');
        entriesWrapper.id = year;
        rightSide.appendChild(entriesWrapper);

        uniqueMonths.forEach((month) => {
          const printMonthRightSide = createParagraph('month-text', month);
          printMonthRightSide.id = `${year}-${format(new Date(), 'MMMM')}`;
          rightSide.appendChild(printMonthRightSide);

          for (let i = diary.entries.length - 1; i >= 0; i--) {
            //looping backwards through the object to display the newest entries on top
            if (diary.entries[i].year === entriesWrapper.id) {
              const entryDetailsWrapper = document.createElement('div');
              entryDetailsWrapper.classList.add('entry-details-wrapper');
              entryDetailsWrapper.id = diary.entries[i].id;
              const printEntryTimestampRightSide = createParagraph(
                'diary-entry-timestamp',
                diary.entries[i].entryTimestamp
              );
              entryDetailsWrapper.appendChild(printEntryTimestampRightSide);
              const diaryEntryTextAndProfilePicWrapper = document.createElement('div');
              diaryEntryTextAndProfilePicWrapper.classList.add('diary-entry-text-and-profile-pic-wrapper');
              const profilePicAndSpeechBubbleWrapper = document.createElement('div');
              profilePicAndSpeechBubbleWrapper.classList.add('profile-pic-speechbubble-pinned-wrapper');
              profilePicAndSpeechBubbleWrapper.appendChild(speechBubble());
              profilePicAndSpeechBubbleWrapper.appendChild(profilePic());
              diaryEntryTextAndProfilePicWrapper.appendChild(profilePicAndSpeechBubbleWrapper);
              const diaryText = createParagraph('diary-entry-text', diary.entries[i].text);
              diaryText.id = diary.entries[i].id;
              diaryEntryTextAndProfilePicWrapper.appendChild(diaryText);
              entryDetailsWrapper.appendChild(diaryEntryTextAndProfilePicWrapper);
              entriesWrapper.appendChild(entryDetailsWrapper);
            }
          }
        });
        rightSide.appendChild(entriesWrapper);
        editDiaryEntriesEventListener(entriesWrapper, diary);
      });
      yearCollapsible();
      monthCollapsible();
      initialEntriesColorPicker(diary);
    }
  });
}

function createNewEntryButton(rightSide, diary) {
  const createNewEntryButton = createButton('create-new-entry-button', 'Create new Entry');
  rightSide.appendChild(createNewEntryButton);
  createNewEntryButton.addEventListener('click', () => {
    createEntryPrompt(diary);
  });
}

function colorPickerEntries(rightSide, diary) {
  const colorPickerAndCreateEntryButtonWrapper = document.createElement('div');
  colorPickerAndCreateEntryButtonWrapper.classList.add('color-picker-and-create-entry-button-wrapper');
  const colorsAndHeadlineTextWrapper = document.createElement('div');
  colorsAndHeadlineTextWrapper.classList.add('colors-and-headline-text-wrapper');
  const colorsHeadlineText = createParagraph('colors-picker-headline-text', 'Diary Entries Color Picker');

  const color1 = document.createElement('div');
  color1.classList.add('color-picker-entries');
  color1.id = 'color1-picker';
  const color2 = document.createElement('div');
  color2.classList.add('color-picker-entries');
  color2.id = 'color2-picker';
  const color3 = document.createElement('div');
  color3.classList.add('color-picker-entries');
  color3.id = 'color3-picker';
  const color4 = document.createElement('div');
  color4.classList.add('color-picker-entries');
  color4.id = 'color4-picker';

  colorPickerAndCreateEntryButtonWrapper.appendChild(document.querySelector('.create-new-entry-button'));
  colorsAndHeadlineTextWrapper.appendChild(colorsHeadlineText);
  colorsAndHeadlineTextWrapper.appendChild(color1);
  colorsAndHeadlineTextWrapper.appendChild(color2);
  colorsAndHeadlineTextWrapper.appendChild(color3);
  colorsAndHeadlineTextWrapper.appendChild(color4);
  colorPickerAndCreateEntryButtonWrapper.appendChild(colorsAndHeadlineTextWrapper);
  rightSide.appendChild(colorPickerAndCreateEntryButtonWrapper);
  colorPickerEventListener(colorsAndHeadlineTextWrapper, diary, color1, color2, color3, color4);
}

function colorPickerEventListener(colorsAndHeadlineTextWrapper, diary, color1, color2, color3, color4) {
  colorsAndHeadlineTextWrapper.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const diaryEntries = document.querySelectorAll('.diary-entry-text-and-profile-pic-wrapper');
    diaryEntries.forEach((entry) => {
      if (clickedElement.id === color1.id) {
        entry.style.backgroundColor = 'rgba(37, 139, 153, 0.7)';
      } else if (clickedElement.id === color2.id) {
        entry.style.backgroundColor = 'rgba(68, 149, 160, 0.7)';
        diary.entriesColor = 'rgba(68, 149, 160, 0.7)';
      } else if (clickedElement.id === color3.id) {
        entry.style.backgroundColor = 'rgba(62, 93, 158, 0.7)';
        diary.entriesColor = 'rgba(62, 93, 158, 0.7)';
      } else if (clickedElement.id === color4.id) {
        entry.style.backgroundColor = 'rgba(41, 150, 132, 0.747)';
        diary.entriesColor = 'rgba(41, 150, 132, 0.747)';
      }
      saveToLocalStorage();
    });
  });
}

function initialEntriesColorPicker(diary) {
  const diaryEntries = document.querySelectorAll('.diary-entry-text-and-profile-pic-wrapper');
  diaryEntries.forEach((entry) => {
    entry.style.backgroundColor = diary.entriesColor;
  });
}

function createEntryPrompt(diary) {
  const mainWrapper = document.querySelector('.main-wrapper');
  const promptWindow = createPromptWindow('prompt-window-new-entry');
  //creating a backdrop div to darken the background if the prompt is open and make the background unresponsive until he prompt is closed
  const backdrop = createBackdrop();
  const entryTextLabel = createFormLabel('create-new-entry-textarea', 'Create new Entry');
  const entryText = createTextarea('create-new-entry-textarea');
  const createEntryButton = createButton('create-entry-button', 'Create new Entry');

  promptWindow.appendChild(closeIcon());
  promptWindow.appendChild(quoteIcon('quote-icon-new-entry-prompt'));
  promptWindow.appendChild(entryTextLabel);
  promptWindow.appendChild(entryText);
  promptWindow.appendChild(createEntryButton);
  mainWrapper.appendChild(promptWindow);
  document.body.appendChild(backdrop);
  closePrompt(promptWindow);
  createEntry(diary, entryText, createEntryButton);
}

function createEntry(diary, entryText, createEntryButton) {
  createEntryButton.addEventListener('click', () => {
    const diaryText = document.createElement('p');
    diaryText.classList.add('diary-entry-text');
    const newEntry = {
      year: format(new Date(), 'yyyy'),
      month: format(new Date(), 'MMMM'),
      day: format(new Date(), 'dd'),
      seconds: format(new Date(), 'ss'),
      entryTimestamp: format(new Date(), 'dd. MMMM. yyyy'),
      text: entryText.value,
      id: uuidv4(),
    };
    diary.entries.push(newEntry);
    diaryText.textContent = newEntry.text;
    printEntriesInDom(diary);
    saveToLocalStorage();
  });
}

function editDiaryEntriesEventListener(entriesWrapper, diary) {
  // using event delegation to select the clicked id and passing it to the edit prompt
  entriesWrapper.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('diary-entry-text')) {
      const diaryEntryId = clickedElement.id;
      createPromptEditDiary(diary, diaryEntryId);
    }
  });
}

function pinnedIconEventListener(entriesWrapper, diary) {
  // using event delegation to select the clicked id and passing it to the edit prompt
  entriesWrapper.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('pinned-not-selected')) {
      const diaryEntryId = clickedElement.id;
      pinnedDiaryEntries(diary, diaryEntryId);
    }
  });
}

function pinnedDiaryEntries(diary, diaryEntryId) {}

function createPromptEditDiary(diary, diaryEntryId) {
  const mainWrapper = document.querySelector('.main-wrapper');
  const promptWindow = createPromptWindow('prompt-window-edit-diary-entry');
  //creating a backdrop div to darken the background if the prompt is open and make the background unresponsive until he prompt is closed
  const backdrop = createBackdrop();
  const diaryIndex = diary.entries.findIndex((item) => item.id === diaryEntryId);
  const entryTextLabel = createFormLabel('create-new-entry-textarea', 'Edit Diary Entry');
  const entryText = createTextarea('create-new-entry-textarea');
  entryText.value = diary.entries[diaryIndex].text;
  const editEntryButton = createButton('edit-entry-button', 'Edit Entry');

  promptWindow.appendChild(closeIcon());
  promptWindow.appendChild(quoteIcon('edit-entry-prompt-quote-icon'));
  promptWindow.appendChild(entryTextLabel);
  promptWindow.appendChild(entryText);
  promptWindow.appendChild(editEntryButton);
  mainWrapper.appendChild(promptWindow);
  document.body.appendChild(backdrop);
  deleteDiaryEntry(diary, diaryIndex, promptWindow);
  closePrompt(promptWindow);
  editDiaryButton(diary, diaryIndex, editEntryButton, entryText, promptWindow);
}

function editDiaryButton(diary, diaryIndex, editEntryButton, entryText, promptWindow) {
  editEntryButton.addEventListener('click', () => {
    diary.entries[diaryIndex].text = entryText.value;
    savedText(promptWindow, 'saved-icon-edit-entry-prompt', 'saved-text-entry-edit');
    saveToLocalStorage();
    printEntriesInDom(diary);
  });
}

function printEntriesInDom(diary) {
  const entriesWrappers = document.querySelectorAll('.diary-entries-wrapper');
  entriesWrappers.forEach((wrapper) => {
    wrapper.remove();
  });
  const years = document.querySelectorAll('.year-text');
  years.forEach((year) => {
    year.remove();
  });
  const months = document.querySelectorAll('.month-text');
  months.forEach((month) => {
    month.remove();
  });
  const rightSide = document.querySelector('.right-side');
  let uniqueYears = new Set();
  let uniqueMonths = new Set();
  diary.entries.forEach((entry) => {
    uniqueYears.add(entry.year);
    uniqueMonths.add(entry.month);
  });
  uniqueYears.forEach((year) => {
    const printYearRightSide = createParagraph('year-text', year);
    printYearRightSide.id = `year-text-${year}`;
    rightSide.appendChild(printYearRightSide);
    const entriesWrapper = document.createElement('div');
    entriesWrapper.classList.add('diary-entries-wrapper');
    entriesWrapper.id = year;
    rightSide.appendChild(entriesWrapper);
    uniqueMonths.forEach((month) => {
      const printMonthRightSide = createParagraph('month-text', month);
      printMonthRightSide.id = `${year}-${format(new Date(), 'MMMM')}`;
      rightSide.appendChild(printMonthRightSide);

      for (let i = diary.entries.length - 1; i >= 0; i--) {
        if (diary.entries[i].year === entriesWrapper.id) {
          const entryDetailsWrapper = document.createElement('div');
          entryDetailsWrapper.classList.add('entry-details-wrapper');
          entryDetailsWrapper.id = diary.entries[i].id;
          const printEntryTimestampRightSide = createParagraph(
            'diary-entry-timestamp',
            diary.entries[i].entryTimestamp
          );
          entryDetailsWrapper.appendChild(printEntryTimestampRightSide);
          const diaryEntryTextAndProfilePicWrapper = document.createElement('div');
          diaryEntryTextAndProfilePicWrapper.classList.add('diary-entry-text-and-profile-pic-wrapper');
          const profilePicAndSpeechBubbleWrapper = document.createElement('div');
          profilePicAndSpeechBubbleWrapper.classList.add('profile-pic-speechbubble-wrapper');
          profilePicAndSpeechBubbleWrapper.appendChild(speechBubble());
          profilePicAndSpeechBubbleWrapper.appendChild(profilePic());
          diaryEntryTextAndProfilePicWrapper.appendChild(profilePicAndSpeechBubbleWrapper);
          const diaryText = createParagraph('diary-entry-text', diary.entries[i].text);
          diaryText.id = diary.entries[i].id;
          diaryEntryTextAndProfilePicWrapper.appendChild(diaryText);

          entryDetailsWrapper.appendChild(diaryEntryTextAndProfilePicWrapper);
          entriesWrapper.appendChild(entryDetailsWrapper);
        }
      }
    });
    rightSide.appendChild(entriesWrapper);
    editDiaryEntriesEventListener(entriesWrapper, diary);
  });
  addingHeightToCollapsableMenu();
  initialEntriesColorPicker(diary);
}
