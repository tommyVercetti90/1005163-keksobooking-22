'use strict';
import { generateOffer } from './data.js';

const ICON = {
  SIZE: [40, 40],
  ANCHOR: [20, 40],
};
const mapForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapFormElements = mapForm.querySelectorAll('fieldset');
const mapFilterElements = mapFilters.querySelectorAll('select');
const mapFilterFeatures = mapFilters.querySelector('.map__features');
const formAdress = document.querySelector('#address');
const mapCenterLat = 35.68951;
const mapCenterLng = 139.69171;

// Меняем свойства главного маркера
const mainMapMarker = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: ICON.SIZE,
  iconAnchor: ICON.ANCHOR,
});

//  Меняем свойства обычного маркера
const regularMapMarker = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: ICON.SIZE,
  iconAnchor: ICON.ANCHOR,
});

// Присвоили map карту из разметки
const map = L.map('map-canvas');

// Создаем главную метку на карту
const mainMarker = L.marker(
  {
    lat: mapCenterLat,
    lng: mapCenterLng,
  },
  { draggable: true, icon: mainMapMarker },
);

// Функция делает формы неактивными
const mapBlock = () => {
  mapForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  mapFilterFeatures.setAttribute('disabled', 'disabled');

  for (let i = 0; i < mapFormElements.length; i++) {
    mapFormElements[i].setAttribute('disabled', 'disabled');
  }

  for (let i = 0; i < mapFilterElements.length; i++) {
    mapFilterElements[i].setAttribute('disabled', 'disabled');
  }
};
// Сразу запустили функцию
mapBlock();

// Функция делает формы активными
const mapUnBlock = () => {
  mapForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  mapFilterFeatures.removeAttribute('disabled');

  for (let i = 0; i < mapFormElements.length; i++) {
    mapFormElements[i].removeAttribute('disabled');
  }

  for (let i = 0; i < mapFilterElements.length; i++) {
    mapFilterElements[i].removeAttribute('disabled');
  }
};

// По умолчанию на странице вызвана функция mapBlock(), когда карта инициализируется срабатывает функция mapUnBlock()
map.on('load', () => {
  mapUnBlock();
});

// Добавили координаты отображения карты
map.setView(
  {
    lat: mapCenterLat,
    lng: mapCenterLng,
  },
  9,
);

// Добавили слой с рисунком карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Добавляем главную метку на карту
mainMarker.addTo(map);

formAdress.value = mapCenterLat + ', ' + mapCenterLng;
// После остановки перемещения маркера, в строку формы передаются координаты метки
mainMarker.on('moveend', (evt) => {
  const getLatLng = evt.target.getLatLng();
  const getLat = getLatLng.lat.toFixed(5);
  const getlng = getLatLng.lng.toFixed(5);
  formAdress.value = `${getLat}, ${getlng}`;
});

// Блокируем от ручного редактирования строку с координатами
formAdress.setAttribute('readonly', 'true');

const markerLayer = L.layerGroup().addTo(map);

// функция добавления меток на карту
const markerMaker = (mapPoints) => {
  markerLayer.clearLayers();
  mapPoints.forEach(function ({ author, offer, location }) {
    const regularMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: regularMapMarker,
      },
    );
    regularMarker
      .addTo(markerLayer)
      .bindPopup(generateOffer({ author, offer }), { keepInView: true });
  });
};

export {
  mapBlock,
  mapUnBlock,
  markerMaker,
  mapCenterLng,
  mapCenterLat,
  mainMarker
};
