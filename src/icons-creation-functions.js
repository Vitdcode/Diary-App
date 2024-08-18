import closeicon from '../src/images/close-icon.png';
import quoteicon from '../src/images/quote-icon.png';
import profileimg from '../src/images/profile-pic.jpeg';
import speechbubble from '../src/images/speech-bubble.png';
import deleteicon from '../src/images/delete-icon.png';
import menuicon from '../src/images/3dots.png';

export function closeIcon() {
  const closeWindowIcon = document.createElement('img');
  closeWindowIcon.classList.add('close-prompt-window-icon');
  closeWindowIcon.src = closeicon;
  return closeWindowIcon;
}

export function quoteIcon(idName) {
  const quoteIcon = document.createElement('img');
  quoteIcon.classList.add('quote-icon');
  quoteIcon.id = `${idName}`;
  quoteIcon.src = quoteicon;
  return quoteIcon;
}

export function profilePic() {
  const profilePic = document.createElement('img');
  profilePic.classList.add('profile-pic');
  profilePic.src = profileimg;
  return profilePic;
}

export function speechBubble() {
  const speechBubble = document.createElement('img');
  speechBubble.classList.add('speech-bubble-diary-entries');
  speechBubble.src = speechbubble;
  return speechBubble;
}

export function deleteDiaryEntryIcon() {
  const deleteDiaryEntryIcon = document.createElement('img');
  deleteDiaryEntryIcon.classList.add('delete-diary-entry-icon');
  deleteDiaryEntryIcon.src = deleteicon;
  return deleteDiaryEntryIcon;
}

export function diaryMenuIcon(diaryItemWrapper) {
  const diaryMenuIcon = document.createElement('img');
  diaryMenuIcon.classList.add('menu-diary-icon');
  diaryMenuIcon.id = diaryItemWrapper.id;
  diaryMenuIcon.src = menuicon;
  return diaryMenuIcon;
}
