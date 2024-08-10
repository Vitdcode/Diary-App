import closeicon from "../src/images/close-icon.png";

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
  const promptHeadline = document.createElement("p");
  promptHeadline.classList.add("prompt-headline");
  promptHeadline.textContent = "Create a new Diary";
  const closeWindowIcon = document.createElement("img");
  closeWindowIcon.classList.add("close-prompt-window-icon");
  closeWindowIcon.src = closeicon;
  const promptInput = document.createElement("input");
  promptInput.id = "create-new-diary-input";
  const createDiaryButton = document.createElement("button");
  createDiaryButton.classList.add("create-diary-button-prompt");
  createDiaryButton.textContent = "Create Diary";

  prompt.appendChild(promptHeadline);
  prompt.appendChild(closeWindowIcon);
  prompt.appendChild(promptInput);
  prompt.appendChild(createDiaryButton);
}
