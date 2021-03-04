const offerForm = document.querySelector('.ad-form');
const propertyType = offerForm.querySelector('#type');
const offerPrice = offerForm.querySelector('#price');
const checkInTime = offerForm.querySelector('#timein');
const checkOutTime = offerForm.querySelector('#timeout');

// Функция замены цены в placeholder
function changePrice() {
  function changeAttributePrice(price) {
    offerPrice.placeholder = price.toString();
    offerPrice.setAttribute('placeholder', price);
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

// Функция валидации цены
function validatePrice() {
  offerPrice.addEventListener('invalid', validationPrice);

  function validationPrice() {
    if (propertyType.options[1] && offerPrice.value < 1000) {
      offerPrice.setCustomValidity('Цена должна быть не менее 1000 руб.');
    } else if (propertyType.options[2] && offerPrice.value < 5000) {
      offerPrice.setCustomValidity('Цена должна быть не менее 5000 руб.');
    } else if (propertyType.options[3] && offerPrice.value < 10000) {
      offerPrice.setCustomValidity('Цена должна быть не менее 10000 руб.');
    } else {
      offerPrice.setCustomValidity('');
    }
  }
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

export { changePrice, validatePrice, syncCheckTime };
