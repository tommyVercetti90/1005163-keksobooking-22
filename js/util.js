const PLACES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKINTIME = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

// генератор случайных чисел
function getRandomNum(min, max, fraction) {
  if (min > max) {
    alert('Значение Oт не может быть больше чем До');
  } else {
    return Math.abs(min + Math.random() * (max - min)).toFixed(fraction);
  }
}

// генератор рандомного элемента массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomNum(0, elements.length - 1, 0)];
};

// функция создающая массив произвольной длинный
function getArrayWithRandomLength(array) {
  let clone = array.slice();
  clone.length = getRandomNum(1, array.length, 0);
  return clone;
}

// генератор рандомного типа апартаментов
const getRandomPlaces = () => {
  return getRandomArrayElement(PLACES);
};

// генератор рандомного время заселения
const getRandomCheckinTime = () => {
  return getRandomArrayElement(CHECKINTIME);
};

// сопоставление типов жилья

function getTranslateType(type) {
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
}

// Получаем  информацию о комнатах
function getGuestsAndRooms(rooms, guests) {
  return rooms + ' комнаты ' + guests + ' гостей';
}

// Получаем  информацию о времени заезда и выезда
function getRegistrationTime(checkin, checkout) {
  return 'Заезд после ' + checkin + ', выезд до' + checkout;
}

// Создаем элемент удобства
function createFeature(feature) {
  const createdFeature = document.createElement('li');
  createdFeature.classList.add('popup__feature');
  createdFeature.classList.add('popup__feature--' + feature);
  return createdFeature;
}

// Добавляем элемент удобства в список
function getFeatures(arrayFeatures) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < arrayFeatures.length; i++) {
    let feature = createFeature(arrayFeatures[i]);
    fragment.appendChild(feature);
  }
  return fragment;
}

// Создаем фотографию жилища
function createPhoto(photo) {
  const createdPhoto = document.createElement('img');
  createdPhoto.classList.add('popup__photo');
  createdPhoto.setAttribute('src', photo);
  createdPhoto.setAttribute('width', 45);
  createdPhoto.setAttribute('height', 40);
  createdPhoto.setAttribute('alt', 'Фотография жилья');
  return createdPhoto;
}

// Функция добавления фотографий
function getPhotos(arrayPhotos) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < arrayPhotos.length; i++) {
    let photo = createPhoto(arrayPhotos[i]);
    fragment.appendChild(photo);
  }
  return fragment;
}

// функция удаления всех детей родителя o_O
function removeChildren(child) {
  while (child.firstChild) {
    child.removeChild(child.firstChild);
  }
}

// удаляем features по умолчанию из разметки
// while (featuresNode.firstChild) {
//   featuresNode.removeChild(featuresNode.firstChild);
// }

export {
  getRandomNum,
  getArrayWithRandomLength,
  getRandomPlaces,
  getRandomCheckinTime,
  getTranslateType,
  FEATURES,
  PHOTOS,
  getGuestsAndRooms,
  getRegistrationTime,
  createFeature,
  getFeatures,
  getPhotos,
  removeChildren
};
