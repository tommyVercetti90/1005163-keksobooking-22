import { markerMaker } from './map.js';
import { resetButton, removeMessage } from './form.js';
import { showAlertSuccess, showAlertError, showAlert } from './alerts.js';

// Получаем данные с сервера и запускаем функцию добавления маркеров на карту
function getData() {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((dataFromServer) => {
      markerMaker(dataFromServer);
    })
    .catch(() => {
      showAlert('Ошибка загрузки меток. Попробуйте ещё раз');
    });
}

function sendData(formData) {
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
}

export { getData, sendData };
