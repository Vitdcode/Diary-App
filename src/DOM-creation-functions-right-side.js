import closeicon from "../src/images/close-icon.png";
import quoteicon from "../src/images/quote-icon.png";
import savedicon from "../src/images/saved-icon.png";
import profileimg from "../src/images/profile-pic.jpeg";

import { diaries, pushToDiariesArray } from "./diary-list-handling";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { closePrompt, yearCollapsible, deleteDiaryEntry, addingHeightToCollapsableMenu, monthCollapsible } from "./ui-functions";
import { savedText } from "./DOM-creation-functions-left-side";

export function createDiaryDetailsRightSide(diaryID) {
  const rightSide = document.querySelector(".right-side");

  const diaryId = document.getElementById(diaryID);
  diaryId.addEventListener("click", () => {
    rightSide.innerHTML = "";
    const diary = diaries.find((item) => item.id === diaryID);
    if (diary) {
      const rightSideHeadline = document.createElement("h1");
      rightSideHeadline.classList.add("right-side-headline");
      rightSideHeadline.textContent = diary.name;
      const diariesItemWrapper = document.querySelectorAll(".diary-item-wrapper");
      diariesItemWrapper.forEach((diary) => {
        diary.style.boxShadow = "none";
      });
      diaryId.style.boxShadow = "0px 0px 10px 0px #6366f1";

      rightSide.appendChild(rightSideHeadline);

      createNewEntryButton(rightSide, diary);

      let uniqueYears = new Set();
      let uniqueMonths = new Set();
      diary.entries.forEach((entry) => {
        uniqueYears.add(entry.year);
        uniqueMonths.add(entry.month);
      });
      uniqueYears.forEach((year) => {
        const printYearRightSide = document.createElement("p");
        printYearRightSide.id = `year-text-${year}`;
        printYearRightSide.classList.add("year-text");
        printYearRightSide.textContent = year;
        rightSide.appendChild(printYearRightSide);

        const entriesWrapper = document.createElement("div");
        entriesWrapper.classList.add("diary-entries-wrapper");
        entriesWrapper.id = year;
        rightSide.appendChild(entriesWrapper);

        uniqueMonths.forEach((month) => {
          const printMonthRightSide = document.createElement("p");
          printMonthRightSide.classList.add("month-text");
          printMonthRightSide.id = `${year}-${format(new Date(), "MMMM")}`;
          printMonthRightSide.textContent = month;
          rightSide.appendChild(printMonthRightSide);

          for (let i = diary.entries.length - 1; i >= 0; i--) {
            //looping backwards through the object to display the newest entries on top
            if (diary.entries[i].year === entriesWrapper.id) {
              const entryDetailsWrapper = document.createElement("div");
              entryDetailsWrapper.classList.add("entry-details-wrapper");
              entryDetailsWrapper.id = diary.entries[i].id;

              const printEntryTimestampRightSide = document.createElement("p");
              printEntryTimestampRightSide.classList.add("diary-entry-timestamp");
              printEntryTimestampRightSide.textContent = diary.entries[i].entryTimestamp;
              entryDetailsWrapper.appendChild(printEntryTimestampRightSide);

              const diaryEntryTextAndProfilePicWrapper = document.createElement("div");
              diaryEntryTextAndProfilePicWrapper.classList.add("diary-entry-text-and-profile-pic-wrapper");

              diaryEntryTextAndProfilePicWrapper.appendChild(createProfilePic());

              const diaryText = document.createElement("p");
              diaryText.classList.add("diary-entry-text");
              diaryText.textContent = diary.entries[i].text;
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
    }
  });
}

function createProfilePic() {
  const profilePic = document.createElement("img");
  profilePic.classList.add("profile-pic");
  profilePic.src = profileimg;
  return profilePic;
}

function createNewEntryButton(rightSide, diary) {
  const createNewEntryButton = document.createElement("button");
  createNewEntryButton.classList.add("create-new-entry-button");
  createNewEntryButton.textContent = "Create new Entry";

  rightSide.appendChild(createNewEntryButton);

  createNewEntryButton.addEventListener("click", () => {
    createEntryPrompt(diary);
  });
}

function createEntryPrompt(diary) {
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
  });
}

function editDiaryEntriesEventListener(entriesWrapper, diary) {
  // using event delegation to select the clicked id and passing it to the edit prompt
  entriesWrapper.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("diary-entry-text")) {
      const diaryEntryId = clickedElement.id;
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
  const diaryIndex = diary.entries.findIndex((item) => item.id === diaryEntryId);

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

function editDiaryButton(diary, diaryIndex, editEntryButton, entryText, promptWindow) {
  editEntryButton.addEventListener("click", () => {
    diary.entries[diaryIndex].text = entryText.value;
    savedText(promptWindow, "saved-icon-edit-entry-prompt", "saved-text-entry-edit");
    localStorage.setItem("diaries", JSON.stringify(diaries));

    printEntriesInDom(diary);
  });
}

function printEntriesInDom(diary) {
  const entriesWrappers = document.querySelectorAll(".diary-entries-wrapper");

  entriesWrappers.forEach((wrapper) => {
    wrapper.remove();
  });

  const years = document.querySelectorAll(".year-text");

  years.forEach((year) => {
    year.remove();
  });

  const months = document.querySelectorAll(".month-text");

  months.forEach((month) => {
    month.remove();
  });

  const rightSide = document.querySelector(".right-side");
  let uniqueYears = new Set();
  let uniqueMonths = new Set();
  diary.entries.forEach((entry) => {
    uniqueYears.add(entry.year);
    uniqueMonths.add(entry.month);
  });
  console.log(uniqueMonths);

  uniqueYears.forEach((year) => {
    const printYearRightSide = document.createElement("p");
    printYearRightSide.id = `year-text-${year}`;
    printYearRightSide.classList.add("year-text");
    printYearRightSide.textContent = year;
    rightSide.appendChild(printYearRightSide);

    const entriesWrapper = document.createElement("div");
    entriesWrapper.classList.add("diary-entries-wrapper");
    entriesWrapper.id = year;
    rightSide.appendChild(entriesWrapper);

    uniqueMonths.forEach((month) => {
      const printMonthRightSide = document.createElement("p");
      printMonthRightSide.classList.add("month-text");
      printMonthRightSide.id = `${year}-${format(new Date(), "MMMM")}`;
      printMonthRightSide.textContent = month;
      rightSide.appendChild(printMonthRightSide);

      for (let i = diary.entries.length - 1; i >= 0; i--) {
        if (diary.entries[i].year === entriesWrapper.id) {
          const entryDetailsWrapper = document.createElement("div");
          entryDetailsWrapper.classList.add("entry-details-wrapper");
          entryDetailsWrapper.id = diary.entries[i].id;

          const printEntryTimestampRightSide = document.createElement("p");
          printEntryTimestampRightSide.classList.add("diary-entry-timestamp");
          printEntryTimestampRightSide.textContent = diary.entries[i].entryTimestamp;
          entryDetailsWrapper.appendChild(printEntryTimestampRightSide);

          const diaryEntryTextAndProfilePicWrapper = document.createElement("div");
          diaryEntryTextAndProfilePicWrapper.classList.add("diary-entry-text-and-profile-pic-wrapper");

          diaryEntryTextAndProfilePicWrapper.appendChild(createProfilePic());

          const diaryText = document.createElement("p");
          diaryText.classList.add("diary-entry-text");
          diaryText.textContent = diary.entries[i].text;
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
  console.log(diaries);
}
