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

// генератор случайных чисел
function random(min, max, fraction) {
  if (min > max) {
    alert("Значение Oт не может быть больше чем До");
  } else {
    return Math.abs(min + Math.random() * (max - min)).toFixed(fraction);
  }
}

// поиск рандомного элемента массива
const getRandomArrayElement = (elements) => {
  return elements[random(0, elements.length - 1, 0)];
};

// генератор рандомного типа апартаментов
const randomPlaces = () => {
  return getRandomArrayElement(PLACES);
};

// генератор рандомного время заселения
const randomCheckinTime = () => {
  return getRandomArrayElement(CHECKINTIME);
};

// генератор рандомной опции
const randomFeatures = () => {
  return getRandomArrayElement(FEATURES);
};

// генератор рандомной фотки
const randomPhoto = () => {
  return getRandomArrayElement(PHOTOS);
};

// Генерим рандомный массив опций

const randomArrFeatures = () => {
  let arr = new Array();
  for (let i = 0; i <= random(0, FEATURES.length, 0); i++) {
    arr[i] = randomFeatures();
  }
  return arr;
};

// Генерим рандомный массив с фото

const randomArrPhotos = () => {
  let arr = new Array();
  for (let i = 0; i <= random(0, PHOTOS.length, 0); i++) {
    arr[i] = randomPhoto();
  }
  return arr;
};

// функция создания обьявления
function generateAds() {
  let adverts = {
    author: {
      avatar: "img/avatars/user" + "0" + random(0, 8, 0) + ".png",
    },

    offer: {
      title: "Offer__title",
      address: "location.x" + "loaction.y",
      price: random(100, 1000, 0),
      type: randomPlaces(),
      rooms: random(1, 10, 0),
      guests: random(1, 50, 0),
      checkin: randomCheckinTime(),
      checkout: randomCheckinTime(),
      features: randomArrFeatures(),
      description: "some-info",
      photos: randomArrPhotos(),
    },

    location: {
      x: random(35.65, 35.7, 5),
      y: random(139.7, 139.8, 5),
    },
  };
  return adverts;
}

// генерим 10 случайных обьявлений и записываем их в массив

let allAds = [];

for (let i = 0; i < 10; i++) {
  allAds[i] = generateAds();
}

// console.log(allAds);
