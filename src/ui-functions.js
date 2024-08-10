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
