'use strict';
const DEFAULT_VALUE = 'any';
const priceValueToRange = {
  low: { min: 0, max: 10000 },
  middle: { min: 10000, max: 50000 },
  high: { min: 50000, max: 1000000 },
};
const mapFilterForm = document.querySelector('.map__filters');
const housingType = mapFilterForm.querySelector('#housing-type');
const housingPrice = mapFilterForm.querySelector('#housing-price');
const housingRooms = mapFilterForm.querySelector('#housing-rooms');
const housingGuests = mapFilterForm.querySelector('#housing-guests');

const adFilterFormHandler = (cb) => {
  mapFilterForm.addEventListener('change', cb);
};

const filterByType = (ad) => {
  return (
    housingType.value === DEFAULT_VALUE || ad.offer.type === housingType.value
  );
};

const priceInRange = (price) => {
  return (
    price >= priceValueToRange[housingPrice.value].min &&
    price < priceValueToRange[housingPrice.value].max
  );
};

const filterByPrice = (ad) => {
  return housingPrice.value === DEFAULT_VALUE || priceInRange(ad.offer.price);
};

const filterByRooms = (ad) => {
  return (
    housingRooms.value === DEFAULT_VALUE ||
    ad.offer.rooms === Number(housingRooms.value)
  );
};

const filterByGuests = (ad) => {
  return (
    housingGuests.value === DEFAULT_VALUE ||
    ad.offer.guests === Number(housingGuests.value)
  );
};

const filteredFeatures = (ad) => {
  let featuresElements = [];
  const checkedFeatures = mapFilterForm.querySelectorAll(
    '#housing-features input:checked',
  );
  checkedFeatures.forEach((element) => featuresElements.push(element.value));
  return featuresElements.every((item) => ad.offer.features.includes(item));
};

const getFilters = (ad) => {
  return (
    filterByType(ad) &&
    filterByPrice(ad) &&
    filterByRooms(ad) &&
    filterByGuests(ad) &&
    filteredFeatures(ad)
  );
};

export { adFilterFormHandler, getFilters };
