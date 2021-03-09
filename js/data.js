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
function generateOffer(advertisement) {
  const offer = advertisement.offer;
  const author = advertisement.author;
  const offerDialog = document.querySelector('#card'); // Берем элемент, в который будем вставлять наш шаблон
  const adsList = offerDialog.content.cloneNode(true);
  const userAds = adsList.querySelector('.popup'); // Берем элемент, в который будем вставлять текст объявления
  const userAvatar = userAds.querySelector('.popup__avatar');
  const featuresNode = userAds.querySelector('.popup__features');
  const flatPhotos = userAds.querySelector('.popup__photos');
  const adTitle = adsList.querySelector('.popup__title');
  const flatAddress = adsList.querySelector('.popup__text--address');
  const flatPrice = adsList.querySelector('.popup__text--price');
  const flatType = adsList.querySelector('.popup__type');
  const flatCapacity = adsList.querySelector('.popup__text--capacity');
  const regestrationTime = adsList.querySelector('.popup__text--time');
  const flatDescription = adsList.querySelector('.popup__description');

  adTitle.textContent = offer.title;
  flatAddress.textContent = offer.adrflat;
  flatPrice.innerHTML = offer.price + ' &#x20bd;/ночь';
  flatType.textContent = getTranslateType(offer.type);
  flatCapacity.textContent = getGuestsAndRooms(offer.rooms, offer.guests);
  regestrationTime.textContent = getRegistrationTime(
    offer.checkin,
    offer.checkout,
  );

  // удаляем детей popup__features
  removeChildren(featuresNode);

  // добавляем сгенерированые преимущества в разметку
  featuresNode.appendChild(getFeatures(offer.features));
  flatDescription.textContent = offer.description;

  flatPhotos.removeChild(adsList.querySelector('.popup__photo')); //удаляем пустую фотку из разметки
  flatPhotos.appendChild(getPhotos(offer.photos)); // добавляем массив фотографий в размтеку

  userAvatar.src = author.avatar;
  return adsList;
}

export { generateArrAds, generateOffer };
