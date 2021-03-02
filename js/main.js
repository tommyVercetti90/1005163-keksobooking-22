import { generateArrAds, generateOffer } from "./data.js";

const arraym = generateArrAds();

var testAr = document.querySelector("#map-canvas");

for (let i = 0; i < arraym.length; i++) {
  var offer = generateOffer(arraym[i]);
  testAr.appendChild(offer);
}
