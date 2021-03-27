'use strict';
const URL = 'https://22.javascript.pages.academy/keksobooking';
// Получаем данные с сервера и запускаем функцию добавления маркеров на карту
const getData = () => {
  return fetch(`${URL}/data`).then((response) => response.json());
};

const sendData = (formData) => {
  return fetch(`${URL}`, {
    method: 'POST',
    body: formData,
  });
};

export { getData, sendData };
