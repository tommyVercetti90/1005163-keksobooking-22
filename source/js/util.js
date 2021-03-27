'use strict';
// сопоставление типов жилья
const getTranslateType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return type;
  }
};

// Получаем  информацию о комнатах
const getGuestsAndRooms = (rooms, guests) => {
  return rooms + ' комнаты ' + guests + ' гостей';
};

// Получаем  информацию о времени заезда и выезда
const getRegistrationTime = (checkin, checkout) => {
  return 'Заезд после ' + checkin + ', выезд до' + checkout;
};

// Создаем элемент удобства
const createFeature = (feature) => {
  const createdFeature = document.createElement('li');
  createdFeature.classList.add('popup__feature');
  createdFeature.classList.add('popup__feature--' + feature);
  return createdFeature;
};

// Добавляем элемент удобства в список
const getFeatures = (arrayFeatures) => {
  const fragment = document.createDocumentFragment();
  arrayFeatures.forEach((element) => {
    let feature = createFeature(element);
    fragment.appendChild(feature);
  });
  return fragment;
};

// Создаем фотографию жилища
const createPhoto = (photo) => {
  const createdPhoto = document.createElement('img');
  createdPhoto.classList.add('popup__photo');
  createdPhoto.setAttribute('src', photo);
  createdPhoto.setAttribute('width', 45);
  createdPhoto.setAttribute('height', 40);
  createdPhoto.setAttribute('alt', 'Фотография жилья');
  return createdPhoto;
};

// Функция добавления фотографий
const getPhotos = (arrayPhotos) => {
  const fragment = document.createDocumentFragment();
  arrayPhotos.forEach((element) => {
    let photo = createPhoto(element);
    fragment.appendChild(photo);
  });
  return fragment;
};

// функция удаления всех детей родителя o_O
const removeChildren = (child) => {
  while (child.firstChild) {
    child.removeChild(child.firstChild);
  }
};

export {
  getTranslateType,
  getGuestsAndRooms,
  getRegistrationTime,
  createFeature,
  getFeatures,
  getPhotos,
  removeChildren
};
