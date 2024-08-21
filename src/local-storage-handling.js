import { diaries } from './diary-list-handling';

export function saveToLocalStorage() {
  localStorage.setItem('diaries', JSON.stringify(diaries));
}

export function getDataFromLocalStorage() {
  const getLocalStorage = localStorage.getItem('diaries');
  return getLocalStorage;
}

export function localStorageBackup() {
  const localStorageData = JSON.stringify(localStorage);
  const blob = new Blob([localStorageData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const backupLink = document.createElement('a');
  backupLink.textContent = 'Create Diary Backup';
  backupLink.classList.add('backup-link');
  backupLink.href = url;
  backupLink.download = `localStorage-backup-${new Date().toISOString()}.json`;

  return backupLink;
}
