'use strict';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadImage = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
      preview.classList.remove('visually-hidden');
    }
  });
};

export { uploadImage };
