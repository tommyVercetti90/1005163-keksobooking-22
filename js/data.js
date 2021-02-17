import {
  getRandomNum,
  getArrayWithRandomLength,
  getRandomPlaces,
  getRandomCheckinTime,
  FEATURES,
  PHOTOS
} from './util.js';

let countAds = 10;

// функция создания обьявления
function generateAds() {
  const adverts = {
    author: {
      avatar: 'img/avatars/user' + '0' + getRandomNum(0, 8, 0) + '.png',
    },

    offer: {
      title: 'Offer__title',
      address: 'location.x' + ', ' + 'loaction.y',
      price: getRandomNum(100, 1000, 0),
      type: getRandomPlaces(),
      rooms: getRandomNum(1, 10, 0),
      guests: getRandomNum(1, 50, 0),
      checkin: getRandomCheckinTime(),
      checkout: getRandomCheckinTime(),
      features: getArrayWithRandomLength(FEATURES),
      description: 'some-info',
      photos: getArrayWithRandomLength(PHOTOS),
    },

    location: {
      x: getRandomNum(35.65, 35.7, 5),
      y: getRandomNum(139.7, 139.8, 5),
    },
  };
  return adverts;
}

// Функция возвращающаая массив объектов объявлений
function generateArrAds() {
  let allAds = [];
  for (let i = 0; i < countAds; i++) {
    allAds.push(generateAds());
  }
  return allAds;
}

export { generateArrAds };
