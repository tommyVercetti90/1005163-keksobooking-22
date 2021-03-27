'use strict';
import { sendData } from './backend.js';
import { showAlertSuccess, showAlertError } from './alerts.js';
import { uploadImage } from './photo.js';
import { mapCenterLng, mapCenterLat, mainMarker } from './map.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const typeFlatToPrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};
const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const offerForm = document.querySelector('.ad-form');
const propertyType = offerForm.querySelector('#type');
const typeDefault = propertyType.value;
const offerAdress = document.querySelector('#address');
const offerPrice = offerForm.querySelector('#price');
const priceDefault = offerPrice.placeholder;
const checkInTime = offerForm.querySelector('#timein');
const checkOutTime = offerForm.querySelector('#timeout');
const timeInDefault = checkInTime.value;
const timeOutDefault = checkOutTime.value;
const offerTitle = offerForm.querySelector('#title');
const offerRooms = offerForm.querySelector('#room_number');
const resetButton = offerForm.querySelector('.ad-form__reset');
const roomDefault = offerRooms.value;
const offerCapacityCount = offerForm.querySelector('#capacity');
const capacityOptions = Array.from(offerCapacityCount.options);
const capacityDefault = offerCapacityCount.value;
const featureCheckbox = document.querySelectorAll('.feature__checkbox');
const offerDescription = document.querySelector('#description');
const descriptionDefault = offerDescription.value;
const avatarChooser = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector(
  '.ad-form-header__preview__avatar',
);
const photoChooser = document.querySelector('.ad-form__input');
const previewPhoto = document.querySelector('.ad-form__photo__pic');

// Функция валидации заголовка обьявления
const offerTitleInputHandler = () => {
  const valueLength = offerTitle.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    offerTitle.setCustomValidity(
      'Введите ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.',
    );
  } else if (valueLength > MAX_NAME_LENGTH) {
    offerTitle.setCustomValidity(
      'Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.',
    );
  } else {
    offerTitle.setCustomValidity('');
  }
  offerTitle.reportValidity();
};

const checkInTimeChangeHandler = (evt) => {
  checkOutTime.value = evt.target.value;
};

const checkOutTimeChangeHandler = (evt) => {
  checkInTime.value = evt.target.value;
};

// Функция сброса аватара
const resetButtonClickHandler = () => {
  previewAvatar.src = 'img/muffin-grey.svg';
  previewPhoto.src = '';
  previewPhoto.classList.add('visually-hidden');
};

const syncCapacity = (roomNumber) => {
  capacityOptions.forEach((option) => {
    option.hidden = !roomsToGuests[roomNumber].includes(option.value);
    option.selected = !option.hidden;
  });
};

const offerRoomsChangeHandler = (roomNumberSelect) => {
  const roomNumber = Number(roomNumberSelect.target.value);
  syncCapacity(roomNumber);
};

const formSuccess = () => {
  offerTitle.value = '';
  offerAdress.value = mapCenterLat + ', ' + mapCenterLng;
  propertyType.value = typeDefault;
  offerPrice.placeholder = priceDefault;
  offerPrice.min = priceDefault;
  offerPrice.value = '';
  checkInTime.value = timeInDefault;
  checkOutTime.value = timeOutDefault;
  offerRooms.value = roomDefault;
  offerCapacityCount.value = capacityDefault;
  featureCheckbox.forEach((element) => {
    element.checked = false;
  });
  offerDescription.value = descriptionDefault;
  mainMarker.setLatLng({ lat: mapCenterLat, lng: mapCenterLng });
  resetButtonClickHandler();
  showAlertSuccess();
};

const offerFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(formData)
    .then((response) => {
      if (response.ok) {
        formSuccess();
      } else {
        showAlertError();
      }
    })
    .catch(() => {
      showAlertError();
    });
};

// Функция замены цены в placeholder
const propertyTypeChangeHandler = (evt) => {
  offerPrice.min = typeFlatToPrice[evt.target.value];
  offerPrice.placeholder = typeFlatToPrice[evt.target.value];
};

const offerPriceInputHandler = () => {
  offerPrice.reportValidity();
};

const initializeForm = () => {
  syncCapacity(offerRooms.value);
  offerRooms.addEventListener('change', offerRoomsChangeHandler);
  propertyType.addEventListener('change', propertyTypeChangeHandler);
  offerTitle.addEventListener('input', offerTitleInputHandler);
  offerPrice.addEventListener('input', offerPriceInputHandler);
  resetButton.addEventListener('click', resetButtonClickHandler);
  checkInTime.addEventListener('change', checkInTimeChangeHandler);
  checkOutTime.addEventListener('change', checkOutTimeChangeHandler);
  offerForm.addEventListener('submit', offerFormSubmitHandler);
};

uploadImage(avatarChooser, previewAvatar);
uploadImage(photoChooser, previewPhoto);

export { initializeForm };
