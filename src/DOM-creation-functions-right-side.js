import closeicon from "../src/images/close-icon.png";
import quoteicon from "../src/images/quote-icon.png";
import savedicon from "../src/images/saved-icon.png";

import { diaries, pushToDiariesArray } from "./diary-list-handling";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import {
  closePrompt,
  yearCollapsible,
  deleteDiaryEntry,
  addingHeightToCollapsableMenu,
} from "./ui-functions";
import { savedText } from "./DOM-creation-functions-left-side";

export function createDiaryDetailsRightSide(diaryID) {
  console.log(diaryID);
  const rightSide = document.querySelector(".right-side");

  const diaryId = document.getElementById(diaryID);
  diaryId.addEventListener("click", () => {
    rightSide.innerHTML = "";
    const diary = diaries.find((item) => item.id === diaryID);
    if (diary) {
      const rightSideHeadline = document.createElement("h1");
      rightSideHeadline.classList.add("right-side-headline");
      rightSideHeadline.textContent = diary.name;
      const diariesItemWrapper = document.querySelectorAll(
        ".diary-item-wrapper"
      );
      diariesItemWrapper.forEach((diary) => {
        diary.style.boxShadow = "none";
      });
      diaryId.style.boxShadow = "0px 0px 10px 0px #6366f1";

      rightSide.appendChild(rightSideHeadline);

      createNewEntryButton(rightSide, diary);

      let uniqueDays = new Set();
      diary.entries.forEach((entry) => {
        uniqueDays.add(entry.day);
      });

      uniqueDays.forEach((day) => {
        const printYearRightSide = document.createElement("p");
        printYearRightSide.id = `year-text-${day}`;
        printYearRightSide.classList.add("year-text");
        printYearRightSide.textContent = day;
        rightSide.appendChild(printYearRightSide);

        const entriesWrapper = document.createElement("div");
        entriesWrapper.classList.add("diary-entries-wrapper");
        entriesWrapper.id = day;
        rightSide.appendChild(entriesWrapper);

        diary.entries.forEach((entry) => {
          if (entry.day === entriesWrapper.id) {
            const entryDetailsWrapper = document.createElement("div");
            entryDetailsWrapper.classList.add("entry-details-wrapper");
            entryDetailsWrapper.id = entry.id;

            const printMonthRightSide = document.createElement("p");
            printMonthRightSide.classList.add("month-text");
            printMonthRightSide.textContent = entry.month;
            entryDetailsWrapper.appendChild(printMonthRightSide);

            const printEntryTimestampRightSide = document.createElement("p");
            printEntryTimestampRightSide.classList.add("diary-entry-timestamp");
            printEntryTimestampRightSide.textContent = entry.entryTimestamp;
            entryDetailsWrapper.appendChild(printEntryTimestampRightSide);

            const diaryText = document.createElement("p");
            diaryText.classList.add("diary-entry-text");
            diaryText.textContent = entry.text;
            diaryText.id = entry.id;
            entryDetailsWrapper.appendChild(diaryText);

            entriesWrapper.appendChild(entryDetailsWrapper);
          }
        });

        rightSide.appendChild(entriesWrapper);
        editDiaryEntriesEventListener(entriesWrapper, diary);
      });
      yearCollapsible();
      console.log(diaries);
    }
  });
}

function createNewEntryButton(rightSide, diary) {
  const createNewEntryButton = document.createElement("button");
  createNewEntryButton.classList.add("create-new-entry-button");
  createNewEntryButton.textContent = "Create new Entry";

  rightSide.appendChild(createNewEntryButton);

  createNewEntryButton.addEventListener("click", () => {
    createEntryPrompt(diary, rightSide);
  });
}

function createEntryPrompt(diary, rightSide) {
  const mainWrapper = document.querySelector(".main-wrapper");
  const promptWindow = document.createElement("div");
  promptWindow.classList.add("prompt-window-new-entry");
  //creating a backdrop div to darken the background if the prompt is open and make the background unresponsive until he prompt is closed
  const backdrop = document.createElement("div");
  backdrop.classList.add("backdrop");

  const promptHeadline = document.createElement("p");
  promptHeadline.classList.add("prompt-new-entry-headline");
  promptHeadline.textContent = "Create a new Diary Entry";

  const closeWindowIcon = document.createElement("img");
  closeWindowIcon.classList.add("close-prompt-window-icon");
  closeWindowIcon.src = closeicon;

  const entryText = document.createElement("textarea");
  entryText.id = "create-new-entry-textarea";
  const entryTextLabel = document.createElement("label");
  entryTextLabel.setAttribute("for", "create-new-entry-textarea");

  const quoteIcon = document.createElement("img");
  quoteIcon.classList.add("quote-icon-new-entry");
  quoteIcon.src = quoteicon;

  const createEntryButton = document.createElement("button");
  createEntryButton.classList.add("create-entry-button");
  createEntryButton.textContent = "Create new Entry";

  promptWindow.appendChild(promptHeadline);
  promptWindow.appendChild(closeWindowIcon);
  promptWindow.appendChild(quoteIcon);
  promptWindow.appendChild(entryTextLabel);
  promptWindow.appendChild(entryText);
  promptWindow.appendChild(createEntryButton);
  mainWrapper.appendChild(promptWindow);
  document.body.appendChild(backdrop);
  closePrompt(promptWindow);
  createEntry(diary, entryText, createEntryButton);
}

function createEntry(diary, entryText, createEntryButton) {
  createEntryButton.addEventListener("click", () => {
    const diaryText = document.createElement("p");
    diaryText.classList.add("diary-entry-text");
    const newEntry = {
      year: format(new Date(), "yyyy"),
      month: format(new Date(), "MMMM"),
      day: format(new Date(), "dd"),
      seconds: format(new Date(), "ss"),
      entryTimestamp: format(new Date(), "dd. MMMM. yyyy"),
      text: entryText.value,
      id: uuidv4(),
    };
    diary.entries.push(newEntry);
    diaryText.textContent = newEntry.text;

    printEntriesInDom(diary);
    localStorage.setItem("diaries", JSON.stringify(diaries));
    addingHeightToCollapsableMenu();
  });

  console.log(diaries);
}

function editDiaryEntriesEventListener(entriesWrapper, diary) {
  // using event delegation to select the clicked id and passing it to the edit prompt
  entriesWrapper.addEventListener("click", (event) => {
    const clickedElement = event.target;
    console.log(clickedElement);
    if (clickedElement.classList.contains("diary-entry-text")) {
      const diaryEntryId = clickedElement.id;
      console.log(diaryEntryId);
      createPromptEditDiary(diary, diaryEntryId);
    }
  });
}

function createPromptEditDiary(diary, diaryEntryId) {
  const mainWrapper = document.querySelector(".main-wrapper");
  const promptWindow = document.createElement("div");
  promptWindow.classList.add("prompt-window-edit-diary-entry");
  //creating a backdrop div to darken the background if the prompt is open and make the background unresponsive until he prompt is closed
  const backdrop = document.createElement("div");
  backdrop.classList.add("backdrop");

  const promptHeadline = document.createElement("p");
  promptHeadline.classList.add("prompt-new-entry-headline");
  promptHeadline.textContent = "Edit Diary Entry";

  const closeWindowIcon = document.createElement("img");
  closeWindowIcon.classList.add("close-prompt-window-icon");
  closeWindowIcon.src = closeicon;
  console.log(diaryEntryId);
  const diaryIndex = diary.entries.findIndex(
    (item) => item.id === diaryEntryId
  );

  const entryText = document.createElement("textarea");
  entryText.value = diary.entries[diaryIndex].text;
  entryText.id = "create-new-entry-textarea";
  const entryTextLabel = document.createElement("label");
  entryTextLabel.setAttribute("for", "create-new-entry-textarea");

  const quoteIcon = document.createElement("img");
  quoteIcon.classList.add("quote-icon-new-entry");
  quoteIcon.src = quoteicon;

  const editEntryButton = document.createElement("button");
  editEntryButton.classList.add("edit-entry-button");
  editEntryButton.textContent = "Edit Entry";

  promptWindow.appendChild(promptHeadline);
  promptWindow.appendChild(closeWindowIcon);
  promptWindow.appendChild(quoteIcon);
  promptWindow.appendChild(entryTextLabel);
  promptWindow.appendChild(entryText);
  promptWindow.appendChild(editEntryButton);
  mainWrapper.appendChild(promptWindow);
  document.body.appendChild(backdrop);
  deleteDiaryEntry(diary, diaryIndex, promptWindow);
  closePrompt(promptWindow);
  editDiaryButton(diary, diaryIndex, editEntryButton, entryText, promptWindow);
}

function editDiaryButton(
  diary,
  diaryIndex,
  editEntryButton,
  entryText,
  promptWindow
) {
  editEntryButton.addEventListener("click", () => {
    diary.entries[diaryIndex].text = entryText.value;
    savedText(
      promptWindow,
      "saved-icon-edit-entry-prompt",
      "saved-text-entry-edit"
    );
    localStorage.setItem("diaries", JSON.stringify(diaries));
    printEntriesInDom(diary);
  });
}

function printEntriesInDom(diary) {
  console.log(entriesWrapper);
  const entriesWrapper = document.getElementById(format(new Date(), "dd"));
  console.log(entriesWrapper);
  const rightSide = document.querySelector(".right-side");
  entriesWrapper.innerHTML = "";

  diary.entries.forEach((entry) => {
    if (entry.day === entriesWrapper.id) {
      const entryDetailsWrapper = document.createElement("div");
      entryDetailsWrapper.classList.add("entry-details-wrapper");
      entryDetailsWrapper.id = entry.id;

      const printMonthRightSide = document.createElement("p");
      printMonthRightSide.classList.add("month-text");
      printMonthRightSide.textContent = entry.month;
      entryDetailsWrapper.appendChild(printMonthRightSide);

      const printEntryTimestampRightSide = document.createElement("p");
      printEntryTimestampRightSide.classList.add("diary-entry-timestamp");
      printEntryTimestampRightSide.textContent = entry.entryTimestamp;
      entryDetailsWrapper.appendChild(printEntryTimestampRightSide);

      const diaryText = document.createElement("p");
      diaryText.classList.add("diary-entry-text");
      diaryText.id = entry.id;
      diaryText.textContent = entry.text;
      entryDetailsWrapper.appendChild(diaryText);

      entriesWrapper.appendChild(entryDetailsWrapper);
      rightSide.appendChild(entriesWrapper);
    }
  });
}
