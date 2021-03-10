import {
  getRandomNum,
  getArrayWithRandomLength,
  getRandomPlaces,
  getRandomCheckinTime,
  FEATURES,
  PHOTOS,
  getTranslateType,
  getGuestsAndRooms,
  getRegistrationTime,
  getFeatures,
  getPhotos,
  removeChildren
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

// Генерируем шаблон объявления
const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const generateOffer = function ({ author, offer }) {
  const similarPopup = cardTemplate.cloneNode(true);
  const flatFeatures = similarPopup.querySelector('.popup__features');

  similarPopup.querySelector('.popup__title').textContent = offer.title;
  similarPopup.querySelector('.popup__text--address').textContent =
    offer.address;
  similarPopup.querySelector(
    '.popup__text--price',
  ).textContent = `${offer.price} ₽/ночь`;
  similarPopup.querySelector('.popup__type').textContent = getTranslateType(
    offer.type,
  );
  similarPopup.querySelector(
    '.popup__text--capacity',
  ).textContent = getGuestsAndRooms(offer.rooms, offer.guests);
  similarPopup.querySelector(
    '.popup__text--time',
  ).textContent = getRegistrationTime(offer.checkin, offer.checkout);
  removeChildren(flatFeatures);
  flatFeatures.appendChild(getFeatures(offer.features));

  similarPopup.querySelector('.popup__description').textContent =
    offer.description;
  similarPopup.querySelector('.popup__photos').innerHTML = '';
  similarPopup
    .querySelector('.popup__photos')
    .appendChild(getPhotos(offer.photos));
  similarPopup.querySelector('.popup__avatar').src = author.avatar;

  return similarPopup;
};

export { generateArrAds, generateOffer };
