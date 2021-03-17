import { adFormHandler } from './form.js';
import { getData } from './backend.js';
import { showAlert } from './alerts.js';
import { markerMaker } from './map.js';

adFormHandler(document.querySelector('.ad-form'));

getData()
  .then((dataFromServer) => {
    markerMaker(dataFromServer);
  })
  .catch(() => {
    showAlert('Ошибка загрузки меток. Попробуйте ещё раз');
  });
