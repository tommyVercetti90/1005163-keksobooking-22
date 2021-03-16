const offerForm = document.querySelector('.ad-form');
const propertyType = offerForm.querySelector('#type');
const offerPrice = offerForm.querySelector('#price');
const checkInTime = offerForm.querySelector('#timein');
const checkOutTime = offerForm.querySelector('#timeout');
const offerTitle = offerForm.querySelector('#title');
const offerRooms = offerForm.querySelector('#room_number');
const offerCapacityCount = offerForm.querySelector('#capacity');
const templateSuccess = document
  .querySelector('#success')
  .content.querySelector('.success');
const templateError = document
  .querySelector('#error')
  .content.querySelector('.error');
const resetButton = offerForm.querySelector('.ad-form__reset');

const mainElement = document.querySelector('main');

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

// Действия на изменения количества комнат
function adFormHandler(form) {
  formRoomsChangeHandler(document.querySelector('#room_number'));
  form.addEventListener('change', filterChangeHandler());
  offerRooms.addEventListener('input', checkRooms);
  offerCapacityCount.addEventListener('input', checkRooms);
}

function filterChangeHandler() {
  return (evt) => {
    if (evt.target) {
      switch (evt.target.id) {
        case 'room_number':
          formRoomsChangeHandler(evt.target);
          break;
        default:
          break;
      }
    }
  };
}

function formRoomsChangeHandler(roomNumberSelect) {
  const roomNumber = Number(roomNumberSelect.value);
  const capacitySelect = document.querySelector('#capacity');
  const capacitySelectOptions = capacitySelect.querySelectorAll('option');

  capacitySelectOptions.forEach((option) => {
    const optionValue = Number(option.value);
    if (optionValue === 0 && roomNumber === 100) {
      option.removeAttribute('disabled');
    } else if (
      optionValue <= roomNumber &&
      optionValue !== 0 &&
      roomNumber !== 100
    ) {
      option.removeAttribute('disabled');
    } else {
      option.setAttribute('disabled', true);
    }
  });
}

function checkRooms() {
  const rooms = Number(offerRooms.value);
  const places = Number(offerCapacityCount.value);

  if (rooms === 100 && places !== 0) {
    offerCapacityCount.setCustomValidity(
      'Нужно выбрать количество мест: не для гостей',
    );
  } else if (rooms !== 100 && places === 0) {
    offerCapacityCount.setCustomValidity(
      'Нужно выбрать количество мест в соответствии количеству комнат',
    );
  } else if (rooms < places && places !== 0) {
    offerCapacityCount.setCustomValidity(
      'Нужно выбрать количество мест в соответствии количеству комнат',
    );
  } else {
    offerCapacityCount.setCustomValidity('');
  }
}

const showAlertSuccess = () => {
  const alertSuccess = templateSuccess.cloneNode(true);
  mainElement.appendChild(alertSuccess);
};

const showAlertError = () => {
  const alertError = templateError.cloneNode(true);
  mainElement.appendChild(alertError);
};

const removeMessage = () => {
  const temporaryMessage = document.querySelector('.success');
  temporaryMessage.remove();
};

// отправляем даннные на сервер
offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        showAlertSuccess();
        setTimeout(removeMessage, 2000);
        resetButton.click();
      } else {
        showAlertError();
      }
    })
    .catch(() => {
      showAlertError();
    });
});

// const errorMessage = document.querySelector('.error');
// const errorButton = document.querySelector('.error__button');
// errorButton.addEventListener('click', function (evt) {
//   errorMessage.remove();
// });

export { changePrice, syncCheckTime, adFormHandler };
