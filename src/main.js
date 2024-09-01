import './style.css';
import { createDiaryButtonInDom, createDiariesFromLocalStorage } from './DOM-creation-functions-left-side.js';
import { pushToDiariesArray, diaries } from './diary-list-handling.js';
import { randomizeSvgWallpaper } from './ui-functions.js';
import { getDataFromLocalStorage } from './local-storage-handling.js';
import { attributionMenu } from './attribution-menu.js';

createDiaryButtonInDom();
randomizeSvgWallpaper(document.body);
document.addEventListener('DOMContentLoaded', () => {
  const localStorageDiaries = getDataFromLocalStorage();
  if (localStorageDiaries) {
    const parsedDiaries = JSON.parse(localStorageDiaries);
    parsedDiaries.forEach((diary) => {
      pushToDiariesArray(
        diary.name,
        diary.id,
        diary.description,
        diary.timestamp,
        diary.entries,
        diary.pinnedEntries,
        diary.entriesColor
      );
    });
  }
  console.log(diaries);
  createDiariesFromLocalStorage();
  attributionMenu();
});
