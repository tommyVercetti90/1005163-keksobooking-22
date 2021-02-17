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

export {
  getRandomNum,
  getArrayWithRandomLength,
  getRandomPlaces,
  getRandomCheckinTime,
  FEATURES,
  PHOTOS
};
