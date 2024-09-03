import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import ResizeModule from '@ssumo/quill-resize-module';
Quill.register('modules/resize', ResizeModule);
import ImageCompress from 'quill-image-compress';
Quill.register('modules/imageCompress', ImageCompress);
import QuillPasteSmart from 'quill-paste-smart';
Quill.register('modules/pasteSmart', QuillPasteSmart);

export function createQuillEditor(quillWrapperId) {
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'], // Toggle buttons
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }], // Add color picker
    [{ align: [] }],
    ['blockquote'],
    ['link'],
    ['image'],
    ['clean'], // Remove formatting button
  ];
  const quill = new Quill(`#${quillWrapperId}`, {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
      resize: {
        locale: {
          locale: {
            floatLeft: 'left',
            floatRight: 'right',
            center: 'center',
            restore: 'restore',
            altTip: 'Press and hold alt to lock ratio!',
            inputTip: 'Press enter key to apply change!',
          },
        },
      },
      imageCompress: {
        quality: 0.7, // default
        maxWidth: 1000, // default
        maxHeight: 1000, // default
        imageType: 'image/jpeg', // default
        debug: true, // default
        suppressErrorLogging: false, // default
        handleOnPaste: true, //default
        insertIntoEditor: undefined, // default
      },
      pasteSmart: {},
    },
  });
  return quill;
}
