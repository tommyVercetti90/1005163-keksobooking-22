import { generateOffer } from "./data.js";

let mapForm = document.querySelector(".ad-form");
let mapFilters = document.querySelector(".map__filters");
let mapFormElements = mapForm.querySelectorAll("fieldset");
let mapFilterElements = mapFilters.querySelectorAll("select");
let mapFilterFeatures = mapFilters.querySelector(".map__features");
let formAdress = document.querySelector("#address");

// Меняем свойства главного маркера
let mainMapMarker = L.icon({
  iconUrl: "img/main-pin.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
});

//  Меняем свойства обычного маркера
let regularMapMarker = L.icon({
  iconUrl: "img/pin.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
});

// Присвоили map карту из разметки
const map = L.map("map-canvas");

// Создаем главную метку на карту
const mainMarker = L.marker(
  {
    lat: 35.68712,
    lng: 139.77099,
  },
  { draggable: true, icon: mainMapMarker }
);

// Функция делает формы неактивными
function mapBlock() {
  mapForm.classList.add("ad-form--disabled");
  mapFilters.classList.add("map__filters--disabled");
  mapFilterFeatures.setAttribute("disabled", "disabled");

  for (let i = 0; i < mapFormElements.length; i++) {
    mapFormElements[i].setAttribute("disabled", "disabled");
  }

  for (let i = 0; i < mapFilterElements.length; i++) {
    mapFilterElements[i].setAttribute("disabled", "disabled");
  }
}
// Сразу запустили функцию
mapBlock();

// Функция делает формы активными
function mapUnBlock() {
  mapForm.classList.remove("ad-form--disabled");
  mapFilters.classList.remove("map__filters--disabled");
  mapFilterFeatures.removeAttribute("disabled");

  for (let i = 0; i < mapFormElements.length; i++) {
    mapFormElements[i].removeAttribute("disabled");
  }

  for (let i = 0; i < mapFilterElements.length; i++) {
    mapFilterElements[i].removeAttribute("disabled");
  }
}

// По умолчанию на странице вызвана функция mapBlock(), когда карта инициализируется срабатывает функция mapUnBlock()
map.on("load", () => {
  mapUnBlock();
});

// Добавили координаты отображения карты
map.setView(
  {
    lat: 35.68712,
    lng: 139.77099,
  },
  10
);

// Добавили слой с рисунком карты
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Автоматическое заполнения поля с координатами по умолчанию
formAdress.value = mainMarker.getLatLng();

// После остановки перемещения маркера, в строку формы передаются координаты метки
mainMarker.on("moveend", (evt) => {
  formAdress.value = evt.target.getLatLng();
});

// Блокируем от ручного редактирования строку с координатами
formAdress.onfocus = function () {
  formAdress.setAttribute("readonly", true);
};

// Добавляем главную метку на карту
mainMarker.addTo(map);

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
      }
    );
    regularMarker
      .addTo(markerLayer)
      .bindPopup(generateOffer({ author, offer }), { keepInView: true });
  });
};

export { mapBlock, mapUnBlock, markerMaker };
