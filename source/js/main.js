/* global _:readonly */
import { adFormHandler } from './form.js';
import { getData } from './backend.js';
import { showAlert } from './alerts.js';
import { markerMaker } from './map.js';
import { adFilterFormHandler, getFilters } from './filter.js';

adFormHandler(document.querySelector('.ad-form'));

const ADS_COUNT = 10;
getData()
  .then((dataFromServer) => {
    let filteredData = dataFromServer.slice(0, ADS_COUNT);
    markerMaker(filteredData);
    adFilterFormHandler(
      _.debounce(() => {
        markerMaker(filteredData.filter(getFilters));
      }, 500),
    );
  })
  .catch(() => {
    showAlert('Ошибка загрузки меток. Попробуйте ещё раз');
  });
