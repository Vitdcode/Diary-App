import closeicon from "../src/images/close-icon.png";
import quoteicon from "../src/images/quote-icon.png";

import { diaries, pushToDiariesArray } from "./diary-list-handling";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { closePrompt, yearCollapsible } from "./ui-functions";

export function createDiaryDetailsRightSide(diaryID) {
  console.log(diaryID);
  const rightSide = document.querySelector(".right-side");

  const diaryId = document.getElementById(diaryID);
  diaryId.addEventListener("click", () => {
    rightSide.innerHTML = "";
    const diary = diaries.find((item) => item.id === diaryID);
    if (diary) {
      const entriesWrapper = document.createElement("div");
      entriesWrapper.classList.add("diary-entries-wrapper");
      entriesWrapper.id = `diary-entries-wrapper-${format(new Date(), "yyyy")}`;

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

      createNewEntryButton(rightSide, diary, entriesWrapper);

      const printYearRightSide = document.createElement("p");
      printYearRightSide.id = `year-text-${format(new Date(), "yyyy")}`;
      printYearRightSide.classList.add("year-text");
      printYearRightSide.textContent = format(new Date(), "yyyy");
      rightSide.appendChild(printYearRightSide);

      yearCollapsible();

      diary.entries.forEach((entry) => {
        const printMonthRightSide = document.createElement("p");
        printMonthRightSide.classList.add("month-text");
        printMonthRightSide.textContent = entry.month;
        entriesWrapper.appendChild(printMonthRightSide);

        const printSecondsRightSide = document.createElement("p");
        printSecondsRightSide.classList.add("seconds-text");
        printSecondsRightSide.textContent = entry.seconds;
        entriesWrapper.appendChild(printSecondsRightSide);

        const diaryText = document.createElement("p");
        diaryText.classList.add("diary-entry-text");
        diaryText.textContent = entry.text;
        entriesWrapper.appendChild(diaryText);
      });
      rightSide.appendChild(entriesWrapper);
      console.log(diaries);
    }
  });
}

function createNewEntryButton(rightSide, diary, entriesWrapper) {
  const createNewEntryButton = document.createElement("button");
  createNewEntryButton.classList.add("create-new-entry-button");
  createNewEntryButton.textContent = "Create new Entry";

  rightSide.appendChild(createNewEntryButton);

  createNewEntryButton.addEventListener("click", () => {
    createEntryPrompt(diary, rightSide, entriesWrapper);
  });
}

function createEntryPrompt(diary, rightSide, entriesWrapper) {
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
  createEntry(diary, rightSide, entryText, createEntryButton, entriesWrapper);
  /* createDiaryItem(prompt, promptInput, diaryDescription, backdrop); */
}

function createEntry(
  diary,
  rightSide,
  entryText,
  createEntryButton,
  entriesWrapper
) {
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
    /*  entriesWrapper.innerHTML = ""; */

    /*     if (!document.getElementById(`year-text-${format(new Date(), "yyyy")}`)) {
      const printYearRightSide = document.createElement("p");
      printYearRightSide.id = `year-text-${format(new Date(), "yyyy")}`;
      printYearRightSide.classList.add("year-text");
      printYearRightSide.textContent = format(new Date(), "yyyy");
      entriesWrapper.appendChild(printYearRightSide);
    }
 */

    /*     document
      .getElementById(`year-text-${format(new Date(), "yyyy")}`)
      .addEventListener("click", () => { */
    entriesWrapper.innerHTML = "";
    diary.entries.forEach((entry) => {
      if (entry.year == "2024") {
        const printMonthRightSide = document.createElement("p");
        printMonthRightSide.classList.add("month-text");
        printMonthRightSide.textContent = entry.month;
        entriesWrapper.appendChild(printMonthRightSide);

        const printSecondsRightSide = document.createElement("p");
        printSecondsRightSide.classList.add("seconds-text");
        printSecondsRightSide.textContent = entry.seconds;
        entriesWrapper.appendChild(printSecondsRightSide);

        const diaryText = document.createElement("p");
        diaryText.classList.add("diary-entry-text");
        diaryText.textContent = entry.text;

        const entryTimestamp = document.createElement("p");
        entryTimestamp.classList.add("diary-entry-timestamp");
        entryTimestamp.textContent = entry.entryTimestamp;

        entriesWrapper.appendChild(diaryText);
        entriesWrapper.appendChild(entryTimestamp);
      }
      /*    }); */
    });
    rightSide.appendChild(entriesWrapper);
  });
  localStorage.setItem("diaries", JSON.stringify(diaries));

  console.log(diaries);
}
