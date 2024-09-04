import { gif, closeAnimation } from './icons-creation-functions.js';
import { createPromptWindow, createButton } from './reused-DOM-functions.js';
import { closePrompt } from './ui-functions.js';
import { formValidation } from './form-validation.js';
import { v4 as uuidv4 } from 'uuid';
import { quill, quillSelection } from './DOM-creation-functions-right-side.js';
import { savedIconAnimated } from './icons-creation-functions.js';
import { filePickerInput } from './form-validation.js';

import searchgif from '../src/gifs/search-animation.gif';
/* import searchgif from '../src/gifs/3dots.png'; */

export function createGifSearchInToolbar() {
  const toolbar = document.querySelector('.ql-toolbar');
  const gifIcon = gif('gif-icon');
  toolbar.appendChild(gifIcon);
  createGifSearchPrompt(gifIcon);
}

export function createGifSearchPrompt(gifIcon) {
  gifIcon.addEventListener('click', () => {
    const mainWrapper = document.querySelector('.main-wrapper');
    const promptWindow = createPromptWindow('gif-search-prompt');
    const gifWrapper = document.createElement('div');
    gifWrapper.classList.add('gif-wrapper');
    const searchBtn = createButton('gif-search-button', 'Search');
    const searchInput = formValidation(
      'gif-search',
      'Gif Search',
      'text',
      '100',
      searchBtn,
      promptWindow
    );

    importGifFromHarddrive(searchInput, promptWindow);
    promptWindow.appendChild(searchInput);
    promptWindow.appendChild(gifWrapper);
    mainWrapper.appendChild(promptWindow);
    closeAnimation(promptWindow, 'close-icon-gif-prompt');
    closePrompt(promptWindow, 'close-icon-gif-prompt');

    fetchGifs(gifWrapper, searchBtn, searchInput);
  });
}

/* export function fetchGifs(gifWrapper, searchBtn, searchInput) {
  searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const searchInputId = document.getElementById('gif-search');
    if (searchInput.checkValidity()) {
      gifWrapper.innerHTML = '';
      const gifCount = 20;
      const apiKey = process.env.API_KEY_GIPHY;
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInputId.value}&limit=${gifCount}`, {
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((response) => {
          response.data.forEach((gif) => {
            const img = document.createElement('img');
            img.id = uuidv4();
            img.classList.add('gif-img');

            img.src = gif.images.original.url;
            gifWrapper.appendChild(img);
          });
        })
        .catch((error) => console.error('Error fetching GIFs:', error));
    } else {
      searchInput.reportValidity();
    }
    putGifOnTextEditor(gifWrapper);
  });
} */

export function fetchGifs(gifWrapper, searchBtn, searchInput) {
  searchBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const searchInputId = document.getElementById('gif-search');
    if (searchInput.checkValidity()) {
      gifWrapper.innerHTML = '';
      const gifCount = 20;
      const apiKey = process.env.API_KEY_GIPHY;
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInputId.value}&limit=${gifCount}`,
          {
            mode: 'cors',
          }
        );
        const gifData = await response.json();

        gifData.data.forEach((gif) => {
          const img = document.createElement('img');
          img.id = uuidv4();
          img.classList.add('gif-img');

          img.src = gif.images.original.url;
          gifWrapper.appendChild(img);
        });
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      }
    } else {
      searchInput.reportValidity();
    }
    putGifOnTextEditor(gifWrapper);
  });
}

function GifAddedToTextEditorAnimation(gifWrapper) {
  //animation and text appearing once a gif is added to the text editor
  const addedGifIconTextWrapper = document.createElement('div'); //
  addedGifIconTextWrapper.classList.add('gif-added-icon-text-wrapper');
  const promptWindow = document.querySelector('.gif-search-prompt');
  promptWindow.appendChild(addedGifIconTextWrapper);
  promptWindow.insertBefore(addedGifIconTextWrapper, gifWrapper);
  const addedGifText = document.createElement('p');
  addedGifText.textContent = 'Added to Text Editor';

  savedIconAnimated(addedGifIconTextWrapper, 'gif-added-to-editor');
  addedGifIconTextWrapper.appendChild(addedGifText);
  setTimeout(() => {
    addedGifText.classList.add('fade-out');
  }, 2000);
  setTimeout(() => {
    promptWindow.removeChild(addedGifIconTextWrapper);
  }, 3500);
}

export function putGifOnTextEditor(gifWrapper) {
  gifWrapper.addEventListener('click', (event) => {
    GifAddedToTextEditorAnimation(gifWrapper);

    const clickedImg = event.target.src;
    if (quillSelection) {
      // Insert the GIF at the cursor position
      quill.insertEmbed(quillSelection.index, 'image', clickedImg);
    }
  });
}

function importGifFromHarddrive(searchInput, prompt) {
  const importFromHarddriveButton = document.createElement('button');
  importFromHarddriveButton.classList.add('import-from-harddrive-button');
  importFromHarddriveButton.textContent = 'Import from Harddrive';
  searchInput.appendChild(importFromHarddriveButton);

  const gifSelector = filePickerInput(prompt);
  importFromHarddriveButton.addEventListener('click', () => {
    gifSelector.click();
  });

  gifSelector.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a FileReader to read the file
      const reader = new FileReader();
      // When file is loaded
      reader.onload = function (e) {
        // Set the src of the image to the file data
        const base64Image = e.target.result;
        console.log(e.target.result);
        // Read the file as a data URL (base64)
        if (quillSelection) {
          // Insert the GIF at the cursor position
          quill.insertEmbed(quillSelection.index, 'image', base64Image);
        }
      };
      reader.readAsDataURL(file);
    }
  });
}
