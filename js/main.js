const PLACES = ["palace", "flat", "house", "bungalow"];
const CHECKINTIME = ["12:00", "13:00", "14:00"];
const FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];

const PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
];

let countAds = 10;

// генератор случайных чисел
function getRandomNum(min, max, fraction) {
  if (min > max) {
    alert("Значение Oт не может быть больше чем До");
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

// функция создания обьявления
function generateAds() {
  adverts = {
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

// console.log(generateArrAds());
