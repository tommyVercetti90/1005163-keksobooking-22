"use strict";
// Получаем данные с сервера и запускаем функцию добавления маркеров на карту
const getData = () => {
  return fetch(
    "https://22.javascript.pages.academy/keksobooking/data"
  ).then((response) => response.json());
};

const sendData = (formData) => {
  return fetch("https://22.javascript.pages.academy/keksobooking", {
    method: "POST",
    body: formData,
  });
};

export { getData, sendData };
