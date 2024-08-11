import closeicon from "../src/images/close-icon.png";
import quoteicon from "../src/images/quote-icon.png";
import menuicon from "../src/images/3dots.png";
import { closePrompt } from "../src/ui-functions.js";
import { pushToDiariesArray, diaries } from "../src/diary-list-handling.js";
import { v4 as uuidv4 } from "uuid";

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

        const diaryMenu3Dots = document.createElement("img");
        diaryMenu3Dots.classList.add("dot-menu-diary-item");
        diaryMenu3Dots.id = diaryItemWrapper.id;
        diaryMenu3Dots.src = menuicon;

        const diaryItemName = document.createElement("p");
        diaryItemName.classList.add("diary-item-name");
        diaryItemName.textContent = promptInput.value;

        const quoteIcon = document.createElement("img");
        quoteIcon.classList.add("quote-icon");
        quoteIcon.src = quoteicon;

        const diaryDescriptionItem = document.createElement("p");
        diaryDescriptionItem.classList.add("diary-description-item");
        diaryDescriptionItem.textContent = diaryDescription.value;
        diaryItemWrapper.appendChild(diaryMenu3Dots);
        diaryItemWrapper.appendChild(diaryItemName);
        diaryItemWrapper.appendChild(quoteIcon);
        diaryItemWrapper.appendChild(diaryDescriptionItem);

        leftSide.appendChild(diaryItemWrapper);
        pushToDiariesArray(
          diaryItemName.textContent,
          diaryItemWrapper.id,
          diaryDescriptionItem.textContent
        );
        console.log(diaries);
        editDiary(diaryItemWrapper.id, diaryMenu3Dots);
        localStorage.setItem("diaries", JSON.stringify(diaries));
      } else {
        alert("Diary Name cannot be Empty");
      }
    });
  }
}

function editDiary(diaryID, diaryMenu3Dots) {
  diaryMenu3Dots.addEventListener("click", () => {
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

    console.log(diary);
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
    saveEditedDiary(editDiarySaveButton, diary, textarea, promptInput);
  });
}

function saveEditedDiary(editDiarySaveButton, diary, textarea, promptInput) {
  editDiarySaveButton.addEventListener("click", () => {
    diary.name = promptInput.value;
    diary.description = textarea.value;
    deleteItemsFromLeftSide();
    localStorage.setItem("diaries", JSON.stringify(diaries));
    createDiariesFromLocalStorage();
    console.log(diaries);
  });
}

function deleteItemsFromLeftSide() {
  diaries.forEach((diary) => {
    const leftSide = document.querySelector(".left-side");
    const diaryItemWrapper = document.querySelector(".diary-item-wrapper");
    leftSide.removeChild(diaryItemWrapper);
  });
}

export function createDiariesFromLocalStorage() {
  diaries.forEach((diary) => {
    const leftSide = document.querySelector(".left-side");
    const diaryItemWrapper = document.createElement("div");
    diaryItemWrapper.id = diary.id;
    diaryItemWrapper.classList.add("diary-item-wrapper");
    const diaryMenu3Dots = document.createElement("img");
    diaryMenu3Dots.classList.add("dot-menu-diary-item");
    diaryMenu3Dots.id = diaryItemWrapper.id;
    diaryMenu3Dots.src = menuicon;
    editDiary(diary.id, diaryMenu3Dots);
    const diaryItemName = document.createElement("p");
    diaryItemName.classList.add("diary-item-name");
    diaryItemName.textContent = diary.name;
    const quoteIcon = document.createElement("img");
    quoteIcon.classList.add("quote-icon");
    quoteIcon.src = quoteicon;
    const diaryDescriptionItem = document.createElement("p");
    diaryDescriptionItem.classList.add("diary-description-item");
    diaryDescriptionItem.textContent = diary.description;
    diaryItemWrapper.appendChild(diaryMenu3Dots);
    diaryItemWrapper.appendChild(diaryItemName);
    diaryItemWrapper.appendChild(quoteIcon);
    diaryItemWrapper.appendChild(diaryDescriptionItem);
    leftSide.appendChild(diaryItemWrapper);
  });
}

function textareaCharCounter(textarea, promptWindow) {
  textarea.setAttribute("maxlength", 90);
  const charCounter = document.createElement("p");
  charCounter.classList.add("char-counter");
  charCounter.textContent = `Max. Characters: ${textarea.value.length} / 90`;

  textarea.addEventListener("input", () => {
    const currentLength = textarea.value.length;
    charCounter.textContent = `Max. Characters: ${currentLength} / 90`;
  });

  promptWindow.appendChild(charCounter);
}
