import { diaries } from "./diary-list-handling";

export function createDiaryDetailsRightSide(diaryID) {
  console.log(diaryID);
  const rightSide = document.querySelector(".right-side");
  const diaryId = document.getElementById(diaryID);
  diaryId.addEventListener("click", () => {
    const diary = diaries.find((item) => item.id === diaryID);
    if (diary) {
      const rightSideHeadline = document.createElement("h1");
      rightSideHeadline.classList.add("right-side-headline");
      rightSideHeadline.textContent = diary.name;
      rightSide.appendChild(rightSideHeadline);
    }
  });
}
