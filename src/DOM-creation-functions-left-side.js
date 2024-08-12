//images
import closeicon from "../src/images/close-icon.png";
import deleteicon from "../src/images/delete-icon.png";
import quoteicon from "../src/images/quote-icon.png";
import menuicon from "../src/images/3dots.png";
import savedicon from "../src/images/saved-icon.png";
//libraries
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
//functions
import {
  closePrompt,
  deleteItemsFromLeftSide,
  deleteAndMenuIconHover,
  deleteDiary,
} from "./ui-functions.js";
import { pushToDiariesArray, diaries } from "./diary-list-handling.js";
import { createDiaryDetailsRightSide } from "./DOM-creation-functions-right-side.js";

export function createDiaryButtonInDom() {
  const leftSide = document.querySelector(".left-side");
  const createDiaryButtonWrapper = document.createElement("div");
  createDiaryButtonWrapper.classList.add("create-diary-button-wrapper");
  const createDiaryButton = document.createElement("button");
  createDiaryButton.classList.add("create-diary-button");
  createDiaryButton.textContent = "Create new Diary";
  createDiaryButtonWrapper.appendChild(createDiaryButton);
  leftSide.appendChild(createDiaryButtonWrapper);
  openNewDiaryPrompt();
}

function openNewDiaryPrompt() {
  const createDiaryButtonSelector = document.querySelector(".create-diary-button"); //prettier-ignore
  const mainWrapper = document.querySelector(".main-wrapper");
  createDiaryButtonSelector.addEventListener("click", () => {
    const promptWindow = document.createElement("div");
    promptWindow.classList.add("prompt-window");
    mainWrapper.appendChild(promptWindow);
    createPromptWindowElements();
  });
}

function createPromptWindowElements() {
  const prompt = document.querySelector(".prompt-window");
  //creating a backdrop div to darken the background if the prompt is open and make the background unresponsive until he prompt is closed
  const backdrop = document.createElement("div");
  backdrop.classList.add("backdrop");

  const promptHeadline = document.createElement("p");
  promptHeadline.classList.add("prompt-headline");
  promptHeadline.textContent = "Create a new Diary";

  const closeWindowIcon = document.createElement("img");
  closeWindowIcon.classList.add("close-prompt-window-icon");
  closeWindowIcon.src = closeicon;
  // Create the label for the input for accessability reasons
  const promptInputAndInputHeadlineWrapper = document.createElement("div");
  promptInputAndInputHeadlineWrapper.classList.add("prompt-input-and-input-headline-wrapper"); //prettier-ignore

  const promptLabel = document.createElement("label");
  promptLabel.setAttribute("for", "create-new-diary-input");
  promptLabel.textContent = "Diary Name";
  const promptInput = document.createElement("input");
  promptInput.id = "create-new-diary-input";
  promptInput.type = "text";
  promptInput.setAttribute("autocomplete", "off");

  const diaryDescription = document.createElement("textarea");
  diaryDescription.id = "describe-your-diary-textarea";
  const diaryDescriptionLabel = document.createElement("label");
  diaryDescriptionLabel.setAttribute("for", "describe-your-diary");
  diaryDescriptionLabel.textContent = "Describe your Diary";
  textareaCharCounter(diaryDescription, prompt);

  const createDiaryButton = document.createElement("button");
  createDiaryButton.classList.add("create-diary-button-prompt");
  createDiaryButton.textContent = "Create Diary";

  prompt.appendChild(promptHeadline);
  prompt.appendChild(closeWindowIcon);
  promptInputAndInputHeadlineWrapper.appendChild(promptLabel);
  promptInputAndInputHeadlineWrapper.appendChild(promptInput);
  promptInputAndInputHeadlineWrapper.appendChild(diaryDescriptionLabel);
  promptInputAndInputHeadlineWrapper.appendChild(diaryDescription);
  prompt.appendChild(promptInputAndInputHeadlineWrapper);
  prompt.appendChild(createDiaryButton);
  document.body.appendChild(backdrop);
  closePrompt(prompt);
  createDiaryItem(prompt, promptInput, diaryDescription, backdrop);
}

function createDiaryItem(prompt, promptInput, diaryDescription) {
  if (prompt) {
    const createDiaryButton = document.querySelector(
      ".create-diary-button-prompt"
    );
    const leftSide = document.querySelector(".left-side");
    createDiaryButton.addEventListener("click", () => {
      if (promptInput.value != "") {
        const diaryItemWrapper = document.createElement("div");
        diaryItemWrapper.id = uuidv4();
        diaryItemWrapper.classList.add("diary-item-wrapper");

        const diaryMenuIcon = document.createElement("img");
        diaryMenuIcon.classList.add("dot-menu-diary-item");
        diaryMenuIcon.id = diaryItemWrapper.id;
        diaryMenuIcon.src = menuicon;

        const deleteDiaryIcon = document.createElement("img");
        deleteDiaryIcon.classList.add("delete-diary-icon");
        deleteDiaryIcon.id = diaryItemWrapper.id;
        deleteDiaryIcon.src = deleteicon;
        deleteAndMenuIconHover(
          diaryItemWrapper,
          deleteDiaryIcon,
          diaryMenuIcon
        );
        deleteDiaryPrompt(diaryItemWrapper, deleteDiaryIcon);

        const diaryItemName = document.createElement("p");
        diaryItemName.classList.add("diary-item-name");
        diaryItemName.textContent = promptInput.value;

        const quoteIcon = document.createElement("img");
        quoteIcon.classList.add("quote-icon");
        quoteIcon.src = quoteicon;

        const diaryDescriptionItem = document.createElement("p");
        diaryDescriptionItem.classList.add("diary-description-item");
        diaryDescriptionItem.textContent = diaryDescription.value;
        diaryItemWrapper.appendChild(diaryMenuIcon);
        diaryItemWrapper.appendChild(deleteDiaryIcon);
        diaryItemWrapper.appendChild(diaryItemName);
        diaryItemWrapper.appendChild(quoteIcon);
        diaryItemWrapper.appendChild(diaryDescriptionItem);

        leftSide.appendChild(diaryItemWrapper);
        pushToDiariesArray(
          diaryItemName.textContent,
          diaryItemWrapper.id,
          diaryDescriptionItem.textContent,
          diaryTimestamp(diaryItemWrapper)
        );

        editDiary(diaryItemWrapper.id, diaryMenuIcon);
        createDiaryDetailsRightSide(diaryItemWrapper.id);

        localStorage.setItem("diaries", JSON.stringify(diaries));
      } else {
        alert("Diary Name cannot be Empty");
      }
    });
  }
}

function diaryTimestamp(diaryItemWrapper) {
  const timestamp = document.createElement("p");
  timestamp.classList.add("diary-timestamp");
  diaryItemWrapper.appendChild(timestamp);
  return (timestamp.textContent = `Created on: ${format(
    new Date(),
    "dd-MM-yyyy-ss"
  )}`);
}

function diaryTimestampFromLocalStorage(diaryItemWrapper, diary) {
  const timestamp = document.createElement("p");
  timestamp.classList.add("diary-timestamp");
  timestamp.textContent = diary.timestamp;
  diaryItemWrapper.appendChild(timestamp);
}

function editDiary(diaryID, diaryMenuIcon) {
  diaryMenuIcon.addEventListener("click", () => {
    const mainWrapper = document.querySelector(".main-wrapper");

    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");

    const inputAndTextWrapper = document.createElement("div");
    inputAndTextWrapper.classList.add(
      "prompt-input-and-input-headline-wrapper"
    );

    const editHeadlline = document.createElement("p");
    editHeadlline.classList.add("diary-edit-prompt-headline");
    editHeadlline.textContent = "Edit Diary";

    const closePromptIcon = document.createElement("img");
    closePromptIcon.classList.add("close-prompt-window-icon");
    closePromptIcon.src = closeicon;

    const editMenu = document.createElement("div");
    editMenu.classList.add("prompt-window");

    const textarea = document.createElement("textarea");
    textarea.id = "describe-your-diary-textarea";
    const editdiaryDescriptionLabel = document.createElement("label");
    editdiaryDescriptionLabel.setAttribute("for", "edit-the-diary-description");
    editdiaryDescriptionLabel.textContent = "Edit Diary Description";

    const promptLabel = document.createElement("label");
    promptLabel.setAttribute("for", "Edit-diary-input");
    promptLabel.textContent = "Edit Diary Name";
    const promptInput = document.createElement("input");
    promptInput.id = "create-new-diary-input";
    promptInput.type = "text";
    promptInput.setAttribute("autocomplete", "off");

    const editDiarySaveButton = document.createElement("button");
    editDiarySaveButton.classList.add("create-diary-button-prompt");
    editDiarySaveButton.textContent = "Save";

    const diary = diaries.find((item) => item.id === diaryID);
    if (diary) {
      promptInput.value = diary.name;
      textarea.value = diary.description;
    }

    textareaCharCounter(textarea, editMenu);
    inputAndTextWrapper.appendChild(promptLabel);
    inputAndTextWrapper.appendChild(promptInput);
    inputAndTextWrapper.appendChild(editdiaryDescriptionLabel);
    inputAndTextWrapper.appendChild(textarea);

    editMenu.appendChild(editHeadlline);
    editMenu.appendChild(closePromptIcon);
    editMenu.appendChild(inputAndTextWrapper);
    editMenu.appendChild(editDiarySaveButton);
    document.body.appendChild(backdrop);
    mainWrapper.appendChild(editMenu);

    closePrompt(editMenu);
    saveEditedDiary(
      editDiarySaveButton,
      diary,
      textarea,
      promptInput,
      editMenu
    );
  });
}

function saveEditedDiary(
  editDiarySaveButton,
  diary,
  textarea,
  promptInput,
  prompt
) {
  editDiarySaveButton.addEventListener("click", () => {
    diary.name = promptInput.value;
    diary.description = textarea.value;
    deleteItemsFromLeftSide();

    const savedIcon = document.createElement("img");
    savedIcon.classList.add("saved-icon");
    savedIcon.src = savedicon;
    const savedText = document.createElement("p");
    savedText.classList.add("saved-text");
    savedText.textContent = "Saved";
    prompt.appendChild(savedIcon);
    prompt.appendChild(savedText);

    setTimeout(() => {
      savedIcon.classList.add("fade-out");
      savedText.classList.add("fade-out");
    }, 1000);

    setTimeout(() => {
      prompt.removeChild(savedIcon);
      prompt.removeChild(savedText);
    }, 2000);

    localStorage.setItem("diaries", JSON.stringify(diaries));
    createDiariesFromLocalStorage();
  });
}

export function createDiariesFromLocalStorage() {
  diaries.forEach((diary) => {
    const leftSide = document.querySelector(".left-side");

    const diaryItemWrapper = document.createElement("div");
    diaryItemWrapper.id = diary.id;
    diaryItemWrapper.classList.add("diary-item-wrapper");

    const diaryMenuIcon = document.createElement("img");
    diaryMenuIcon.classList.add("dot-menu-diary-item");
    diaryMenuIcon.id = diaryItemWrapper.id;
    diaryMenuIcon.src = menuicon;

    const deleteDiaryIcon = document.createElement("img");
    deleteDiaryIcon.classList.add("delete-diary-icon");
    deleteDiaryIcon.id = diaryItemWrapper.id;
    deleteDiaryIcon.src = deleteicon;
    deleteAndMenuIconHover(diaryItemWrapper, deleteDiaryIcon, diaryMenuIcon);
    editDiary(diary.id, diaryMenuIcon);
    deleteDiaryPrompt(diaryItemWrapper, deleteDiaryIcon);

    const diaryItemName = document.createElement("p");
    diaryItemName.classList.add("diary-item-name");
    diaryItemName.textContent = diary.name;

    const quoteIcon = document.createElement("img");
    quoteIcon.classList.add("quote-icon");
    quoteIcon.src = quoteicon;

    const diaryDescriptionItem = document.createElement("p");
    diaryDescriptionItem.classList.add("diary-description-item");
    diaryDescriptionItem.textContent = diary.description;

    diaryTimestampFromLocalStorage(diaryItemWrapper, diary);

    diaryItemWrapper.appendChild(diaryMenuIcon);
    diaryItemWrapper.appendChild(deleteDiaryIcon);
    diaryItemWrapper.appendChild(diaryItemName);
    diaryItemWrapper.appendChild(quoteIcon);
    diaryItemWrapper.appendChild(diaryDescriptionItem);
    leftSide.appendChild(diaryItemWrapper);
    createDiaryDetailsRightSide(diary.id);
  });
}

function textareaCharCounter(textarea, promptWindow) {
  textarea.setAttribute("maxlength", 80);
  const charCounter = document.createElement("p");
  charCounter.classList.add("char-counter");
  charCounter.textContent = `Max. Characters: ${textarea.value.length} / 80`;

  textarea.addEventListener("input", () => {
    const currentLength = textarea.value.length;
    charCounter.textContent = `Max. Characters: ${currentLength} / 80`;
  });

  promptWindow.appendChild(charCounter);
}

function deleteDiaryPrompt(diaryItemWrapper, deleteIcon) {
  deleteIcon.addEventListener("click", () => {
    const mainWrapper = document.querySelector(".main-wrapper");
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");

    const deletePromptWindow = document.createElement("div");
    deletePromptWindow.classList.add("delete-prompt-window");

    const deleteDiaryHeadline = document.createElement("h1");
    deleteDiaryHeadline.classList.add("delete-diary-headline");
    deleteDiaryHeadline.textContent = "Do you want to delete this Diary?";

    const yesButton = document.createElement("button");
    yesButton.classList.add("yes-button");
    yesButton.textContent = "YES";

    const noButton = document.createElement("button");
    noButton.classList.add("no-button");
    noButton.textContent = "NO";

    document.body.appendChild(backdrop);
    deletePromptWindow.appendChild(deleteDiaryHeadline);
    deletePromptWindow.appendChild(yesButton);
    deletePromptWindow.appendChild(noButton);
    mainWrapper.appendChild(deletePromptWindow);
    deleteDiary(
      yesButton,
      noButton,
      diaryItemWrapper,
      backdrop,
      deletePromptWindow,
      mainWrapper
    );
  });
}
