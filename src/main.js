import "./style.css";
import {
  createDiaryButtonInDom,
  createDiariesFromLocalStorage,
} from "./DOM-creation-functions.js";
import { pushToDiariesArray, diaries } from "./diary-list-handling.js";

createDiaryButtonInDom();

document.addEventListener("DOMContentLoaded", () => {
  console.log(diaries);
  const localStorageDiaries = localStorage.getItem("diaries");
  if (localStorageDiaries) {
    const parsedDiaries = JSON.parse(localStorageDiaries);
    parsedDiaries.forEach((diary) => {
      pushToDiariesArray(diary.name, diary.id, diary.description);
    });
  }
  console.log(localStorage);
  createDiariesFromLocalStorage();
});
document.querySelector("#clear-local-storage").addEventListener("click", () => {
  localStorage.clear();
});
