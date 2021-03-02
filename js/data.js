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
  createFeature,
  getFeatures,
  getPhotos,
} from "./util.js";

let countAds = 1;

// функция создания обьявления
function generateAds() {
  const adverts = {
    author: {
      avatar: "img/avatars/user" + "0" + getRandomNum(0, 8, 0) + ".png",
    },

    offer: {
      title: "Offer__title",
      address: "location.x" + ", " + "loaction.y",
      price: getRandomNum(100, 1000, 0),
      type: getRandomPlaces(),
      rooms: getRandomNum(1, 10, 0),
      guests: getRandomNum(1, 50, 0),
      checkin: getRandomCheckinTime(),
      checkout: getRandomCheckinTime(),
      features: getArrayWithRandomLength(FEATURES),
      description: "some-info",
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
  var offer = advertisement.offer;
  var author = advertisement.author;
  var offerDialog = document.querySelector("#card"); // Берем элемент, в который будем вставлять наш шаблон
  var adsList = offerDialog.content.cloneNode(true);

  var userAds = adsList.querySelector(".popup"); // Берем элемент, в который будем вставлять текст объявления
  var userAvatar = userAds.querySelector(".popup__avatar");
  var featuresNode = userAds.querySelector(".popup__features");
  var popupPhotos = userAds.querySelector(".popup__photos");

  adsList.querySelector(".popup__title").textContent = offer.title;
  adsList.querySelector(".popup__text--address").textContent = offer.adress;
  adsList.querySelector(".popup__text--price").innerHTML =
    offer.price + " &#x20bd;/ночь";
  adsList.querySelector(".popup__type").textContent = getTranslateType(
    offer.type
  );
  adsList.querySelector(
    ".popup__text--capacity"
  ).textContent = getGuestsAndRooms(offer.rooms, offer.guests);
  adsList.querySelector(".popup__text--time").textContent = getRegistrationTime(
    offer.checkin,
    offer.checkout
  );

  // удаляем features по умолчанию из разметки
  while (featuresNode.firstChild) {
    featuresNode.removeChild(featuresNode.firstChild);
  }

  // добавляем сгенерированые преимущества в разметку
  adsList
    .querySelector(".popup__features")
    .appendChild(getFeatures(offer.features));

  adsList.querySelector(".popup__description").textContent = offer.description;

  popupPhotos.removeChild(adsList.querySelector(".popup__photo")); //удаляем пустую фотку из разметки
  adsList.querySelector(".popup__photos").appendChild(getPhotos(offer.photos)); // добавляем массив фотографий в размтеку

  userAvatar.src = author.avatar;
  return adsList;
}

export { generateArrAds, generateOffer };
