import { changePrice, syncCheckTime, adFormHandler } from './form.js';
import { getData } from './backend.js';

adFormHandler(document.querySelector('.ad-form'));
changePrice();
syncCheckTime();
getData();
