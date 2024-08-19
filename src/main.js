import './style.css';
import { createDiaryButtonInDom, createDiariesFromLocalStorage } from './DOM-creation-functions-left-side.js';
import { pushToDiariesArray } from './diary-list-handling.js';
import { randomizeSvgWallpaper } from './ui-functions.js';

createDiaryButtonInDom();
randomizeSvgWallpaper(document.body);
document.addEventListener('DOMContentLoaded', () => {
  const localStorageDiaries = localStorage.getItem('diaries');
  console.log(localStorage);
  if (localStorageDiaries) {
    const parsedDiaries = JSON.parse(localStorageDiaries);
    parsedDiaries.forEach((diary) => {
      pushToDiariesArray(diary.name, diary.id, diary.description, diary.timestamp, diary.entries, diary.entriesColor);
    });
  }

  createDiariesFromLocalStorage();
});
