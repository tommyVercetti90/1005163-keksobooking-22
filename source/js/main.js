/* global _:readonly */
'use strict';
import { initializeForm } from './form.js';
import { getData } from './backend.js';
import { showAlert } from './alerts.js';
import { markerMaker } from './map.js';
import { adFilterFormHandler, getFilters } from './filter.js';

const ADS_COUNT = 10;
const CREATE_MARKERS_DELAY = 500;

initializeForm(document.querySelector('.ad-form'));

getData()
  .then((dataFromServer) => {
    let filteredData = dataFromServer.slice(0, ADS_COUNT);
    markerMaker(filteredData);
    adFilterFormHandler(
      _.debounce(() => {
        markerMaker(filteredData.filter(getFilters));
      }, CREATE_MARKERS_DELAY),
    );
  })
  .catch(() => {
    showAlert('Ошибка загрузки меток. Попробуйте ещё раз');
  });
