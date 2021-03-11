const offerForm = document.querySelector('.ad-form');
const propertyType = offerForm.querySelector('#type');
const offerPrice = offerForm.querySelector('#price');
const checkInTime = offerForm.querySelector('#timein');
const checkOutTime = offerForm.querySelector('#timeout');
const offerTitle = offerForm.querySelector('#title');
const offerRooms = offerForm.querySelector('#room_number');
const offerCapacityCount = offerForm.querySelector('#capacity');
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

// валидируем заголовок обьявления
offerTitle.addEventListener('invalid', () => {
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
});

// валидируем цену
offerPrice.addEventListener('invalid', () => {
  if (offerPrice.validity.tooLong) {
    offerPrice.setCustomValidity('Цена не может быть больше 1000000');
  } else if (offerPrice.validity.valueMissing) {
    offerPrice.setCustomValidity('Обязательное поле');
  } else {
    offerPrice.setCustomValidity('');
  }
});

// Функция замены цены в placeholder
function changePrice() {
  function changeAttributePrice(price) {
    offerPrice.setAttribute('placeholder', price.toString());
    offerPrice.setAttribute('min', price);
  }

  propertyType.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'bungalow':
        changeAttributePrice(0);
        break;
      case 'flat':
        changeAttributePrice(1000);
        break;
      case 'house':
        changeAttributePrice(5000);
        break;
      case 'palace':
        changeAttributePrice(10000);
        break;
      default:
        changeAttributePrice(1000);
        break;
    }
  });
}

let syncCheckInTime = function (evt) {
  checkOutTime.value = evt.target.value;
};

let syncCheckOutTime = function (evt) {
  checkInTime.value = evt.target.value;
};

function syncCheckTime() {
  checkInTime.addEventListener('change', syncCheckInTime);
  checkOutTime.addEventListener('change', syncCheckOutTime);
}

offerRooms.addEventListener('change', function (evt) {
  switch (evt.target.value) {
    case '1':
      syncFields(offerCapacityCount, 1);
      break;
    case '0':
      syncFields(offerCapacityCount, 0);
      break;
    default:
      syncFields(offerCapacityCount, 0);
      break;
  }
});

offerCapacityCount.addEventListener('change', function (evt) {
  switch (evt.target.value) {
    case '1':
      syncFields(offerRooms, 1);
      break;
    case '0':
      syncFields(offerRooms, 0);
      break;
    default:
      syncFields(offerRooms, 0);
      break;
  }
});

function syncFields(field, syncField) {
  field.value = syncField.toString();
}

export { changePrice, syncCheckTime };
