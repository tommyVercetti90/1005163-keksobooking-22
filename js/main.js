import { changePrice, syncCheckTime, adFormHandler } from './form.js';
import { getData } from './map.js';

adFormHandler(document.querySelector('.ad-form'));
changePrice();
syncCheckTime();
getData();
