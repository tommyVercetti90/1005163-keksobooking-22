import { changePrice, syncCheckTime, adFormHandler } from './form.js';

adFormHandler(document.querySelector('.ad-form'));
changePrice();
syncCheckTime();
