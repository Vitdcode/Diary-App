import "./style.css";
import {
  createDiaryButtonInDom,
  createDiariesFromLocalStorage,
} from "./DOM-creation-functions-left-side.js";
import { pushToDiariesArray, diaries } from "./diary-list-handling.js";
import { randomizeSvgWallpaper } from "./ui-functions.js";

createDiaryButtonInDom();
randomizeSvgWallpaper(document.body);
document.addEventListener("DOMContentLoaded", () => {
  console.log(diaries);
  const localStorageDiaries = localStorage.getItem("diaries");
  if (localStorageDiaries) {
    const parsedDiaries = JSON.parse(localStorageDiaries);
    parsedDiaries.forEach((diary) => {
      pushToDiariesArray(
        diary.name,
        diary.id,
        diary.description,
        diary.timestamp
      );
    });
  }
  console.log(localStorage);
  createDiariesFromLocalStorage();
});
document.querySelector("#clear-local-storage").addEventListener("click", () => {
  localStorage.clear();
});
