import { changePrice, syncCheckTime, adFormHandler } from './form.js';

import { markerMaker } from './map.js';

adFormHandler(document.querySelector('.ad-form'));
changePrice();
syncCheckTime();
markerMaker();
