import { diaries } from './diary-list-handling';

export function saveToLocalStorage() {
  localStorage.setItem('diaries', JSON.stringify(diaries));
}

export function getDataFromLocalStorage() {
  const getLocalStorage = localStorage.getItem('diaries');
  return getLocalStorage;
}
