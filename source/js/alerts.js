'use strict';
const ALERT_SHOW_TIME = 5000;
const mainElement = document.querySelector('main');
const templateError = document
  .querySelector('#error')
  .content.querySelector('.error');
const templateSuccess = document
  .querySelector('#success')
  .content.querySelector('.success');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('marker-load-error');

  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const addAlertEventListeners = (cb) => {
  const windowKeyDownHandler = (evt) => {
    if (evt.keyCode === 27) {
      cb();
    }
  };
  const windowClickHandler = () => {
    cb();
    window.removeEventListener('keydown', windowKeyDownHandler);
  };
  window.addEventListener('keydown', windowKeyDownHandler, { once: true });
  window.addEventListener('click', windowClickHandler, { once: true });
};

// Функция показа и удалелия уведомления при неудачной попытке отправить данные на сервер
const showAlertError = () => {
  const alertError = templateError.cloneNode(true);
  mainElement.appendChild(alertError);
  const errorMessage = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', function () {
    errorMessage.remove();
  });
  addAlertEventListeners(() => {
    errorMessage.remove();
  });
};

// Функция показывает и удаляет уведомление при успешной отправке даннных на сревер
const showAlertSuccess = () => {
  const alertSuccess = templateSuccess.cloneNode(true);
  mainElement.appendChild(alertSuccess);
  const successMessage = document.querySelector('.success');
  addAlertEventListeners(() => {
    successMessage.remove();
  });
};

export { showAlert, showAlertSuccess, showAlertError };
