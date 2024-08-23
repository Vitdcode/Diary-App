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
} from './icons-creation-functions.js';
import pinnediconcolor from '../src/images/pinned-color.png';
import pinnedblackwhite from '../src/images/pinned-black-white.png';
//functions for creating DOM elements
import {
  createBackdrop,
  createFormLabel,
  createTextarea,
  createButton,
  createPromptWindow,
  createParagraph,
  createQuillEditor,
} from './reused-DOM-functions.js';
//other functions
import { diaries } from './diary-list-handling';
import {
  closePrompt,
  yearCollapsible,
  deleteDiaryEntry,
  addingHeightToCollapsableMenu,
  monthCollapsible,
  pinnedCollapsibale,
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
      pinnedCollapsableMenu.appendChild(pinnedIconSelected('pinned-inside-collapsible-menu-icon'));
      const entriesWrapperPinned = document.createElement('div');
      entriesWrapperPinned.classList.add('diary-entries-wrapper-pinned-menu');
      rightSide.appendChild(pinnedCollapsableMenu);
      rightSide.appendChild(entriesWrapperPinned);
      pushPinnedEntriesToPinnedMenu(diary);
      pinnedCollapsibale();

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

          loopingAndAppendingEntries(diary, entriesWrapper);
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

  const createEntryButton = createButton('create-entry-button', 'Create new Entry');

  mainWrapper.appendChild(promptWindow);
  promptWindow.appendChild(closeIcon());
  promptWindow.appendChild(quoteIcon('quote-icon-new-entry-prompt'));
  const entryTextLabel = createFormLabel('quill-editor-create-entry', 'Create new Entry');
  promptWindow.appendChild(entryTextLabel);

  const quillWrapper = document.createElement('div');
  quillWrapper.id = 'quill-editor-create-entry';
  promptWindow.appendChild(quillWrapper);
  const quill = createQuillEditor('quill-editor-create-entry');

  promptWindow.appendChild(createEntryButton);

  document.body.appendChild(backdrop);
  closePrompt(promptWindow);
  createEntry(diary, quill, createEntryButton);
}

function createEntry(diary, quill, createEntryButton) {
  createEntryButton.addEventListener('click', () => {
    const diaryText = document.createElement('p');
    diaryText.classList.add('diary-entry-text');
    const newEntry = {
      year: format(new Date(), 'yyyy'),
      month: format(new Date(), 'MMMM'),
      day: format(new Date(), 'dd'),
      seconds: format(new Date(), 'ss'),
      entryTimestamp: format(new Date(), 'dd. MMMM. yyyy'),
      text: quill.root.innerHTML,
      id: uuidv4(),
      pinned: false,
    };
    diary.entries.push(newEntry);
    diaryText.textContent = newEntry.text;
    printEntriesInDom(diary);
    saveToLocalStorage();
    console.log(diaries);
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
  entriesWrapper.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const diaryEntryId = clickedElement.id;
    const indexEntry = diary.entries.findIndex((item) => item.id === diaryEntryId);
    if (clickedElement.classList.contains('not-pinned')) {
      clickedElement.classList.replace('not-pinned', 'pinned');
      diary.entries[indexEntry].pinned = true;
      console.log(diaries);
      clickedElement.src = pinnediconcolor;
      newEntryPinnedMenu(diary, diaryEntryId, indexEntry);
      console.log('not pinned to pinned');

      saveToLocalStorage();
    } else if (clickedElement.classList.contains('pinned')) {
      clickedElement.classList.replace('pinned', 'not-pinned');
      console.log('pinned to not pinned');
      diary.entries[indexEntry].pinned = false;
      const indexPinnedEntry = diary.pinnedEntries.findIndex((item) => item.id === diaryEntryId);
      diary.pinnedEntries.splice(indexPinnedEntry, 1);

      document.getElementById(diaryEntryId).remove();
      console.log(diaries);
      clickedElement.src = pinnedblackwhite;

      saveToLocalStorage();
    }
  });
}

function newEntryPinnedMenu(diary, diaryEntryId, entryIndex) {
  const newEntry = {
    year: diary.entries[entryIndex].year,
    month: diary.entries[entryIndex].month,
    day: diary.entries[entryIndex].day,
    entryTimestamp: diary.entries[entryIndex].entryTimestamp,
    text: diary.entries[entryIndex].text,
    id: diary.entries[entryIndex].id,
    pinned: diary.entries[entryIndex].pinned,
  };
  diary.pinnedEntries.push(newEntry);
  pushPinnedEntriesToPinnedMenu(diary, diaryEntryId, newEntry);
}

function pushPinnedEntriesToPinnedMenu(diary, diaryEntryId, newEntry) {
  const entriesWrapperPinned = document.querySelector('.diary-entries-wrapper-pinned-menu');
  if (entriesWrapperPinned.childElementCount === 0) {
    for (let i = 0; i < diary.pinnedEntries.length; i++) {
      createElementsInPinnedMenu(diary.pinnedEntries[i].id, diary.pinnedEntries[i], entriesWrapperPinned);
    }
    return;
  } else if (
    diary.entries[findIndexOfEntry(diary, diaryEntryId)].text ===
    diary.pinnedEntries[findIndexOfPinnedEntry(diary, diaryEntryId)].text
  ) {
    const pinnedEntries = document.querySelectorAll('.entry-details-wrapper-pinned-menu');
    pinnedEntries.forEach((pinnedEntry) => {
      pinnedEntry.remove();
    });
    for (let i = 0; i < diary.pinnedEntries.length; i++) {
      createElementsInPinnedMenu(diary.pinnedEntries[i].id, diary.pinnedEntries[i], entriesWrapperPinned);
    }
    return;
  } else {
    createElementsInPinnedMenu(newEntry.id, newEntry, entriesWrapperPinned);
  }
}

function findIndexOfEntry(diary, diaryEntryId) {
  const index = diary.entries.findIndex((item) => item.id === diaryEntryId);
  return index;
}

function findIndexOfPinnedEntry(diary, diaryEntryId) {
  const index = diary.pinnedEntries.findIndex((item) => item.id === diaryEntryId);
  return index;
}

function createElementsInPinnedMenu(id, entry, entriesWrapperPinned) {
  const pushedEntryDetailsWrapper = document.createElement('div');
  pushedEntryDetailsWrapper.classList.add('entry-details-wrapper-pinned-menu');
  pushedEntryDetailsWrapper.id = id;
  const printEntryTimestampRightSide = createParagraph('diary-entry-timestamp', entry.entryTimestamp);
  pushedEntryDetailsWrapper.appendChild(printEntryTimestampRightSide);
  const diaryEntryTextAndProfilePicWrapper = document.createElement('div');
  diaryEntryTextAndProfilePicWrapper.classList.add('diary-entry-text-and-profile-pic-wrapper');

  const profilePicAndSpeechBubbleWrapper = document.createElement('div');
  profilePicAndSpeechBubbleWrapper.classList.add('profile-pic-speechbubble-wrapper');
  profilePicAndSpeechBubbleWrapper.appendChild(speechBubble());
  profilePicAndSpeechBubbleWrapper.appendChild(profilePic());
  const pinnedNotSelected = pinnedIconSelected('pinned', pushedEntryDetailsWrapper.id);

  diaryEntryTextAndProfilePicWrapper.appendChild(pinnedNotSelected);
  diaryEntryTextAndProfilePicWrapper.appendChild(profilePicAndSpeechBubbleWrapper);
  const diaryText = createParagraph('diary-entry-text', entry.text);
  /*   diaryText.id = newEntry.id; */
  diaryEntryTextAndProfilePicWrapper.appendChild(diaryText);
  pushedEntryDetailsWrapper.appendChild(diaryEntryTextAndProfilePicWrapper);
  entriesWrapperPinned.appendChild(pushedEntryDetailsWrapper);
  document.querySelector('.right-side').insertBefore(entriesWrapperPinned, document.querySelector('.year-text'));
}

function createPromptEditDiary(diary, diaryEntryId) {
  const mainWrapper = document.querySelector('.main-wrapper');
  const promptWindow = createPromptWindow('prompt-window-edit-diary-entry');
  //creating a backdrop div to darken the background if the prompt is open and make the background unresponsive until he prompt is closed
  const backdrop = createBackdrop();
  const diaryEntryIndex = diary.entries.findIndex((item) => item.id === diaryEntryId);
  const diaryPinnedEntryIndex = diary.pinnedEntries.findIndex((item) => item.id === diaryEntryId);
  const entryTextLabel = createFormLabel('create-new-entry-textarea', 'Edit Diary Entry');
  const entryText = createTextarea('create-new-entry-textarea');
  entryText.value = diary.entries[diaryEntryIndex].text;
  const editEntryButton = createButton('edit-entry-button', 'Edit Entry');

  promptWindow.appendChild(closeIcon());
  promptWindow.appendChild(quoteIcon('edit-entry-prompt-quote-icon'));
  promptWindow.appendChild(entryTextLabel);
  promptWindow.appendChild(entryText);
  promptWindow.appendChild(editEntryButton);
  mainWrapper.appendChild(promptWindow);
  document.body.appendChild(backdrop);
  deleteDiaryEntry(diary, diaryEntryIndex, diaryPinnedEntryIndex, promptWindow);
  closePrompt(promptWindow);
  editDiaryButton(
    diary,
    diaryEntryId,
    diaryEntryIndex,
    diaryPinnedEntryIndex,
    editEntryButton,
    entryText,
    promptWindow
  );
}

function editDiaryButton(
  diary,
  diaryEntryId,
  diaryIndex,
  diaryPinnedEntryIndex,
  editEntryButton,
  entryText,
  promptWindow
) {
  editEntryButton.addEventListener('click', () => {
    diary.entries[diaryIndex].text = entryText.value;
    diary.pinnedEntries[diaryPinnedEntryIndex].text = entryText.value;
    pushPinnedEntriesToPinnedMenu(diary, diaryEntryId);
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

      loopingAndAppendingEntries(diary, entriesWrapper);
    });
    rightSide.appendChild(entriesWrapper);
    editDiaryEntriesEventListener(entriesWrapper, diary);
  });
  addingHeightToCollapsableMenu();
  initialEntriesColorPicker(diary);
}

function loopingAndAppendingEntries(diary, entriesWrapper) {
  for (let i = diary.entries.length - 1; i >= 0; i--) {
    if (diary.entries[i].year === entriesWrapper.id) {
      const entryDetailsWrapper = document.createElement('div');
      entryDetailsWrapper.classList.add('entry-details-wrapper');
      entryDetailsWrapper.id = diary.entries[i].id;
      const printEntryTimestampRightSide = createParagraph('diary-entry-timestamp', diary.entries[i].entryTimestamp);
      entryDetailsWrapper.appendChild(printEntryTimestampRightSide);
      const diaryEntryTextAndProfilePicWrapper = document.createElement('div');
      diaryEntryTextAndProfilePicWrapper.classList.add('diary-entry-text-and-profile-pic-wrapper');

      const profilePicAndSpeechBubbleWrapper = document.createElement('div');
      profilePicAndSpeechBubbleWrapper.classList.add('profile-pic-speechbubble-wrapper');
      profilePicAndSpeechBubbleWrapper.appendChild(speechBubble());
      profilePicAndSpeechBubbleWrapper.appendChild(profilePic());
      const pinnedNotSelected = pinnedIconNotSelected('not-pinned', entryDetailsWrapper.id);
      const pinnedSelected = pinnedIconSelected('pinned', entryDetailsWrapper.id);
      if (diary.entries[i].pinned == false) {
        diaryEntryTextAndProfilePicWrapper.appendChild(pinnedNotSelected);
      } else {
        diaryEntryTextAndProfilePicWrapper.appendChild(pinnedSelected);
      }
      diaryEntryTextAndProfilePicWrapper.appendChild(profilePicAndSpeechBubbleWrapper);
      const diaryText = createParagraph('diary-entry-text', diary.entries[i].text);
      diaryText.id = diary.entries[i].id;
      diaryEntryTextAndProfilePicWrapper.appendChild(diaryText);

      entryDetailsWrapper.appendChild(diaryEntryTextAndProfilePicWrapper);
      entriesWrapper.appendChild(entryDetailsWrapper);
    }
  }

  pinnedIconEventListener(entriesWrapper, diary);
}
