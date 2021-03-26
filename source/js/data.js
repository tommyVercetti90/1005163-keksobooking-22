"use strict";
import {
  getTranslateType,
  getGuestsAndRooms,
  getRegistrationTime,
  getFeatures,
  getPhotos,
  removeChildren,
} from "./util.js";

// Генерируем шаблон объявления
const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".popup");

const generateOffer = ({ author, offer }) => {
  const similarPopup = cardTemplate.cloneNode(true);
  const flatFeatures = similarPopup.querySelector(".popup__features");

  similarPopup.querySelector(".popup__title").textContent = offer.title;
  similarPopup.querySelector(".popup__text--address").textContent =
    offer.address;
  similarPopup.querySelector(
    ".popup__text--price"
  ).textContent = `${offer.price} ₽/ночь`;
  similarPopup.querySelector(".popup__type").textContent = getTranslateType(
    offer.type
  );
  similarPopup.querySelector(
    ".popup__text--capacity"
  ).textContent = getGuestsAndRooms(offer.rooms, offer.guests);
  similarPopup.querySelector(
    ".popup__text--time"
  ).textContent = getRegistrationTime(offer.checkin, offer.checkout);
  removeChildren(flatFeatures);
  flatFeatures.appendChild(getFeatures(offer.features));

  similarPopup.querySelector(".popup__description").textContent =
    offer.description;
  similarPopup.querySelector(".popup__photos").innerHTML = "";
  similarPopup
    .querySelector(".popup__photos")
    .appendChild(getPhotos(offer.photos));
  similarPopup.querySelector(".popup__avatar").src = author.avatar;

  return similarPopup;
};

export { generateOffer };
