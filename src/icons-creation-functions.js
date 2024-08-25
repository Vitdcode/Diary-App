import closeicon from '../src/images/close-icon.png';
import quoteicon from '../src/images/quote-icon.png';
import profileimg from '../src/images/profile-pic.jpeg';
import speechbubble from '../src/images/speech-bubble.png';
import deleteentryicon from '../src/images/delete-icon.png';
import menuicon from '../src/images/3dots.png';
import savedicon from '../src/images/saved-icon.png';
import pinnediconcolor from '../src/images/pinned-color.png';
import pinnedblackwhite from '../src/images/pinned-black-white.png';
import dots from '../src/images/three-dots.png';

//lottie animations
import lottie from 'lottie-web';
import trashanimation from '../src/animations/trash-animation.json';
import deletediary from '../src/animations/delete-diary.json';
import speechbubbleanimation from '../src/animations/speech-bubble-animation.json';
import writediaryanimation from '../src/animations/write-list2.json';
import menu from '../src/animations/menu.json';
import calenderanim from '../src/animations/calender-animation.json';
import close from '../src/animations/close.json';

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

export function editEntryMenu(id) {
  const clickableDots = document.createElement('img');
  clickableDots.classList.add('dot-entry-menu');
  clickableDots.id = id;
  clickableDots.src = dots;
  return clickableDots;
}

//animated icons

export function trashAnimationIcon(parentWrapper) {
  const deleteIcon = document.createElement('div');
  deleteIcon.classList.add('trash-animation-icon');

  const trashAnimation = lottie.loadAnimation({
    container: deleteIcon,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: trashanimation,
  });
  parentWrapper.appendChild(deleteIcon);
  document.querySelector('.trash-animation-icon').addEventListener('mouseover', function () {
    trashAnimation.play();
  });
  document.querySelector('.trash-animation-icon').addEventListener('mouseleave', function () {
    trashAnimation.stop();
  });
  return deleteIcon;
}

export function speechBubbleAnimationIcon(parentWrapper, grandparentWrapper, greatGrandparentWrapper) {
  const speechBubble = document.createElement('div');
  speechBubble.classList.add('speech-bubble-animation-icon');

  lottie.loadAnimation({
    container: speechBubble,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: speechbubbleanimation,
  });
  parentWrapper.appendChild(speechBubble);
  grandparentWrapper.appendChild(parentWrapper);
  greatGrandparentWrapper.appendChild(grandparentWrapper);
  return speechBubble;
}

export function diaryWritingAnimation(parentWrapper, className) {
  const writeDiary = document.createElement('div');
  writeDiary.classList.add(className);

  const writeDiaryLottie = lottie.loadAnimation({
    container: writeDiary,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: writediaryanimation,
  });
  parentWrapper.appendChild(writeDiary);
  parentWrapper.addEventListener('mouseover', function () {
    writeDiaryLottie.play();
  });
  parentWrapper.addEventListener('mouseleave', function () {
    writeDiaryLottie.stop();
  });
  return writeDiary;
}

export function menuAnimation(parentWrapper, id, className) {
  const menuAnimation = document.createElement('div');
  menuAnimation.classList.add(className);
  menuAnimation.id = id;
  const menuAnim = lottie.loadAnimation({
    container: menuAnimation,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: menu,
  });
  parentWrapper.appendChild(menuAnimation);
  menuAnimation.addEventListener('mouseover', function () {
    menuAnim.play();
  });
  menuAnimation.addEventListener('mouseleave', function () {
    menuAnim.stop();
  });
  return menuAnimation;
}

export function calenderAnimation(parentWrapper) {
  const calender = document.createElement('div');
  calender.classList.add('calender-icon-animation');

  const calenderAnim = lottie.loadAnimation({
    container: calender,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: calenderanim,
  });
  parentWrapper.appendChild(calender);
  document.querySelector('.year-text').addEventListener('mouseover', function () {
    calenderAnim.play();
  });
  document.querySelector('.year-text').addEventListener('mouseleave', function () {
    calenderAnim.stop();
  });
  return calender;
}

export function closeAnimation(parentWrapper) {
  const closeIcon = document.createElement('div');
  closeIcon.classList.add('close-icon-animation');

  const closeAnim = lottie.loadAnimation({
    container: closeIcon,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: close,
  });
  parentWrapper.appendChild(closeIcon);
  document.querySelector('.close-icon-animation').addEventListener('mouseover', function () {
    closeAnim.play();
  });
  document.querySelector('.close-icon-animation').addEventListener('mouseleave', function () {
    closeAnim.stop();
  });
  return closeIcon;
}

export function deleteDiaryIcon(parentWrapper) {
  const deleteDiary = document.createElement('div');
  deleteDiary.classList.add('delete-diary-animation-icon');
  const delteDiaryAnim = lottie.loadAnimation({
    container: deleteDiary,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: deletediary,
  });
  parentWrapper.appendChild(deleteDiary);
  deleteDiary.addEventListener('mouseover', function () {
    delteDiaryAnim.play();
  });
  deleteDiary.addEventListener('mouseleave', function () {
    delteDiaryAnim.stop();
  });
  return deleteDiary;
}
