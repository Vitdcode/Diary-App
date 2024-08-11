import { diaries } from "../src/diary-list-handling.js";

export function closePrompt(prompt) {
  if (prompt) {
    const mainWrapper = document.querySelector(".main-wrapper");
    const closePromptIcon = document.querySelector(".close-prompt-window-icon");
    const backdrop = document.querySelector(".backdrop");
    closePromptIcon.addEventListener("click", () => {
      mainWrapper.removeChild(prompt);
      document.body.removeChild(backdrop);
    });
  }
}

export function deleteItemsFromLeftSide() {
  diaries.forEach((diary) => {
    const leftSide = document.querySelector(".left-side");
    const diaryItemWrapper = document.querySelector(".diary-item-wrapper");
    leftSide.removeChild(diaryItemWrapper);
  });
}
