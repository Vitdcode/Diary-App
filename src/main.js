import "./style.css";
import {
  createDiaryButtonInDom,
  createDiariesFromLocalStorage,
} from "./DOM-creation-functions.js";
import { pushToDiariesArray } from "./diary-list-handling.js";

createDiaryButtonInDom();

document.addEventListener("DOMContentLoaded", () => {
  const localStorageDiaries = localStorage.getItem("diaries");
  if (localStorageDiaries) {
    const parsedDiaries = JSON.parse(localStorageDiaries);
    parsedDiaries.forEach((diary) => {
      pushToDiariesArray(diary.name);
    });
  }
  createDiariesFromLocalStorage();
});
document.querySelector("#clear-local-storage").addEventListener("click", () => {
  localStorage.clear();
});
