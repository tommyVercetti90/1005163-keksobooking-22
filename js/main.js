import { generateArrAds, generateOffer } from './data.js';

import { changePrice, validatePrice, syncCheckTime } from './form.js';

const arraym = generateArrAds();

const testAr = document.querySelector('#map-canvas');

for (let i = 0; i < arraym.length; i++) {
  const offer = generateOffer(arraym[i]);
  testAr.appendChild(offer);
}

changePrice();
validatePrice();
syncCheckTime();
