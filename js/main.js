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

// функция создающая массив произвольной длинный

function getArrayLength(array) {
  let clone = array.slice();
  clone.length = random(1, array.length, 0);
  return clone;
}

// генератор рандомного типа апартаментов
const randomPlaces = () => {
  return getRandomArrayElement(PLACES);
};

// генератор рандомного время заселения
const randomCheckinTime = () => {
  return getRandomArrayElement(CHECKINTIME);
};

// функция создания обьявления
function generateAds() {
  let adverts = {
    author: {
      avatar: "img/avatars/user" + "0" + random(0, 8, 0) + ".png",
    },

    offer: {
      title: "Offer__title",
      address: "location.x" + ", " + "loaction.y",
      price: random(100, 1000, 0),
      type: randomPlaces(),
      rooms: random(1, 10, 0),
      guests: random(1, 50, 0),
      checkin: randomCheckinTime(),
      checkout: randomCheckinTime(),
      features: getArrayLength(FEATURES),
      description: "some-info",
      photos: getArrayLength(PHOTOS),
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

console.log(allAds);
