import closeicon from "../src/images/close-icon.png";
import { closePrompt } from "../src/ui-functions.js";
import { pushToDiariesArray, diaries } from "../src/diary-list-handling.js";

export function createDiaryButtonInDom() {
  const leftSide = document.querySelector(".left-side");
  const createDiaryButton = document.createElement("button");
  createDiaryButton.classList.add("create-diary-button");
  createDiaryButton.textContent = "Create new Diary";
  leftSide.appendChild(createDiaryButton);
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
  promptLabel.textContent = "Diary Name:";
  const promptInput = document.createElement("input");
  promptInput.id = "create-new-diary-input";
  promptInput.type = "text";
  const createDiaryButton = document.createElement("button");
  createDiaryButton.classList.add("create-diary-button-prompt");
  createDiaryButton.textContent = "Create Diary";

  prompt.appendChild(promptHeadline);
  prompt.appendChild(closeWindowIcon);
  promptInputAndInputHeadlineWrapper.appendChild(promptLabel);
  promptInputAndInputHeadlineWrapper.appendChild(promptInput);
  prompt.appendChild(promptInputAndInputHeadlineWrapper);
  prompt.appendChild(createDiaryButton);
  document.body.appendChild(backdrop);
  closePrompt(prompt);
  createDiaryItem(prompt, promptInput);
}

function createDiaryItem(prompt, promptInput) {
  if (prompt) {
    const createDiaryButton = document.querySelector(
      ".create-diary-button-prompt"
    );
    const leftSide = document.querySelector(".left-side");
    createDiaryButton.addEventListener("click", () => {
      if (promptInput.value != "") {
        const diaryItemWrapper = document.createElement("div");
        diaryItemWrapper.classList.add("diary-item-wrapper");
        const diaryItemName = document.createElement("p");
        diaryItemName.classList.add("diary-item-name");
        diaryItemName.textContent = promptInput.value;
        diaryItemWrapper.appendChild(diaryItemName);
        leftSide.appendChild(diaryItemWrapper);
        pushToDiariesArray(diaryItemName.textContent);
        localStorage.setItem("diaries", JSON.stringify(diaries));
      } else {
        alert("Diary Name cannot be Empty");
      }
    });
  }
}

export function createDiariesFromLocalStorage() {
  diaries.forEach((diary) => {
    const leftSide = document.querySelector(".left-side");
    const diaryItemWrapper = document.createElement("div");
    diaryItemWrapper.classList.add("diary-item-wrapper");
    const diaryItemName = document.createElement("p");
    diaryItemName.classList.add("diary-item-name");
    diaryItemName.textContent = diary.name;
    diaryItemWrapper.appendChild(diaryItemName);
    leftSide.appendChild(diaryItemWrapper);
  });
}
