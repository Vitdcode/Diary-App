import './style.css';
import { createDiaryButtonInDom, createDiariesFromLocalStorage } from './DOM-creation-functions-left-side.js';
import { pushToDiariesArray, diaries } from './diary-list-handling.js';
import { randomizeSvgWallpaper, closePrompt } from './ui-functions.js';
import { getDataFromLocalStorage } from './local-storage-handling.js';
import { createBackdrop, createPromptWindow } from './reused-DOM-functions.js';
import { closeAnimation } from './icons-creation-functions.js';
import DOMPurify from 'dompurify';
import thankyou from '../src/images/thank-you2.png';

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

function attributionMenu() {
  const mainWrapper = document.querySelector('.main-wrapper');
  const attributionText = document.querySelector('#background-attribution');
  attributionText.addEventListener('click', () => {
    const backdrop = createBackdrop();
    const prompt = createPromptWindow('attribution-prompt');
    const thanksImg = document.createElement('img');
    thanksImg.classList.add('thanks-image');
    thanksImg.src = thankyou;
    const headline = document.createElement('p');
    headline.classList.add('attribution-headline');
    headline.textContent = 'In this project I use several amazing 3rd party resources:';
    const svgBackground = document.createElement('div');
    svgBackground.innerHTML =
      DOMPurify.sanitize(`- SVG Background images by <a target="_blank" href="https://bgjar.com">BGJar</a> and
      <a target="_blank" href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/">Matt</a>`);
    const icons = document.createElement('div');
    icons.innerHTML = DOMPurify.sanitize(`- Icons by
      <a href="https://www.freepik.com/">Freepik</a>, animated Icons by <a href="https://lottiefiles.com/">Lottie</a> and 
      <a href="https://animatedicons.co/">AnimatedIcons</a>`);
    const libraries = document.createElement('div');
    libraries.innerHTML = DOMPurify.sanitize(
      `<p>- Libraries:</p> <a target="_blank" href="https://quilljs.com/">Quill Text Editor</a> 
      <p><a target="_blank" href="https://github.com/scrapooo/quill-resize-module">Image resizing Module</a> </p>
       <p><a target="_blank" href="https://www.npmjs.com/package/quill-image-compress">Image Compress Module</a> </p>
        <p><a target="_blank" href="https://www.npmjs.com/package/dompurify">DOMPurify</a> </p>
         <p><a target="_blank" href="https://www.npmjs.com/package/date-fns">date-fns</a> </p>
          <p><a target="_blank" href="https://www.npmjs.com/package/uuid">uuid</a> </p>
        `
    );
    prompt.appendChild(headline);
    prompt.appendChild(thanksImg);
    prompt.appendChild(svgBackground);
    prompt.appendChild(icons);
    prompt.appendChild(libraries);
    document.body.appendChild(backdrop);
    mainWrapper.appendChild(prompt);
    closeAnimation(prompt);
    closePrompt(prompt);
  });
}
