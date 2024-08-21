import closeicon from '../src/images/close-icon.png';
import quoteicon from '../src/images/quote-icon.png';
import profileimg from '../src/images/profile-pic.jpeg';
import speechbubble from '../src/images/speech-bubble.png';
import deleteentryicon from '../src/images/delete-icon.png';
import deletediaryicon from '../src/images/delete-icon2.png';
import menuicon from '../src/images/3dots.png';
import savedicon from '../src/images/saved-icon.png';
import pinnediconcolor from '../src/images/pinned-color.png';
import pinnedblackwhite from '../src/images/pinned-black-white.png';

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
  deleteDiaryEntryIcon.src = deleteentryicon;
  return deleteDiaryEntryIcon;
}

export function deleteDiaryIcon() {
  const deleteDiaryIcon = document.createElement('img');
  deleteDiaryIcon.classList.add('delete-diary-icon');
  deleteDiaryIcon.src = deletediaryicon;
  return deleteDiaryIcon;
}

export function diaryMenuIcon(diaryItemWrapper) {
  const diaryMenuIcon = document.createElement('img');
  diaryMenuIcon.classList.add('menu-diary-icon');
  diaryMenuIcon.id = diaryItemWrapper.id;
  diaryMenuIcon.src = menuicon;
  return diaryMenuIcon;
}

export function savedIcon(className) {
  const savedIcon = document.createElement('img');
  savedIcon.classList.add(className);
  savedIcon.src = savedicon;
  return savedIcon;
}

export function pinnedIconSelected(className, id) {
  const pinnedIconColor = document.createElement('img');
  pinnedIconColor.src = pinnediconcolor;
  pinnedIconColor.id = id;
  pinnedIconColor.classList.add(className);
  return pinnedIconColor;
}

export function pinnedIconNotSelected(className, id) {
  const pinnedIconBlackWhite = document.createElement('img');
  pinnedIconBlackWhite.src = pinnedblackwhite;
  pinnedIconBlackWhite.id = id;
  pinnedIconBlackWhite.classList.add(className);
  return pinnedIconBlackWhite;
}
