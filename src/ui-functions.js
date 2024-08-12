import { diaries } from "../src/diary-list-handling.js";
//svgs
import svgbackground1 from "../src/images/svgs/svg1.svg";
import svgbackground2 from "../src/images/svgs/svg2.svg";
import svgbackground3 from "../src/images/svgs/svg3.svg";
import svgbackground4 from "../src/images/svgs/svg4.svg";
import svgbackground5 from "../src/images/svgs/svg5.svg";
import svgbackground6 from "../src/images/svgs/svg6.svg";
import svgbackground7 from "../src/images/svgs/svg7.svg";
import svgbackground8 from "../src/images/svgs/svg8.svg";
import svgbackground9 from "../src/images/svgs/svg9.svg";
import svgbackground10 from "../src/images/svgs/svg10.svg";
import svgbackground11 from "../src/images/svgs/svg11.svg";

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

export function randomizeSvgWallpaper(element) {
  const svgsArray = [
    `url(${svgbackground1})`,
    `url(${svgbackground2})`,
    `url(${svgbackground3})`,
    `url(${svgbackground4})`,
    `url(${svgbackground5})`,
    `url(${svgbackground6})`,
    `url(${svgbackground7})`,
    `url(${svgbackground8})`,
    `url(${svgbackground9})`,
    `url(${svgbackground10})`,
    `url(${svgbackground11})`,
  ];

  const randomizeNum = Math.floor(Math.random() * svgsArray.length);
  element.style.backgroundImage = svgsArray[randomizeNum];
}

export function deleteAndMenuIconHover(
  diaryItemWrapper,
  deleteIcon,
  diaryMenuIcon
) {
  deleteIcon.addEventListener("mouseenter", () => {
    diaryItemWrapper.style.outline = "1px solid rgba(194, 78, 78, 0.815)";
  });

  deleteIcon.addEventListener("mouseleave", () => {
    diaryItemWrapper.style.outline = ""; // Removes the outline when the mouse leaves
  });

  diaryMenuIcon.addEventListener("mouseenter", () => {
    diaryItemWrapper.style.outline = "1px solid rgba(120, 98, 173, 0.671)";
  });

  diaryMenuIcon.addEventListener("mouseleave", () => {
    diaryItemWrapper.style.outline = ""; // Removes the outline when the mouse leaves
  });
}

export function deleteDiary(
  yesButton,
  noButton,
  diaryItemWrapper,
  backdrop,
  deletePromptWindow,
  mainWrapper
) {
  yesButton.addEventListener("click", () => {
    const leftSide = document.querySelector(".left-side");
    const diaryItemWrapperID = document.getElementById(diaryItemWrapper.id);
    leftSide.removeChild(diaryItemWrapperID);
    document.body.removeChild(backdrop);
    mainWrapper.removeChild(deletePromptWindow);
    const diaryIndex = diaries.findIndex(
      (item) => item.id === diaryItemWrapper.id
    );
    console.log(diaryIndex);
    if (diaries[diaryIndex]) {
      diaries.splice(diaryIndex, 1);
    }
    localStorage.setItem("diaries", JSON.stringify(diaries));
  });

  noButton.addEventListener("click", () => {
    document.body.removeChild(backdrop);
    mainWrapper.removeChild(deletePromptWindow);
  });
}
