import * as btnUp from './modules/btn-up.js';
import * as filter from './modules/filter.js';
import * as cart from './modules/cart.js';
import * as headerBackgroundChange from './modules/header-background-change.js';
import * as hide from './modules/hide.js';
import * as header from './modules/header.js';
import * as pagination from './modules/pagination.js';
import * as slider from './modules/slider.js';
import * as tabs from './modules/tabs.js';
import * as video from './modules/video.js';
import * as initPhoneMask from './modules/phone-mask.js';
import * as map from './modules/map.js';
import * as photo from './modules/photo.js';
import {initModals} from './modules/init-modals.js';import {CustomSelect} from './modules/custom-select.js';

btnUp.btnUp.addEventListener();
cart.cart();
header.header();
filter.filter();
headerBackgroundChange.headerBackgroundChange();
map.map();
pagination.pagination();
photo.photo();
slider.slider();
tabs.tabs();
video.video();
hide.hide();
initPhoneMask.initPhoneMask();

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initModals();
  });
});

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const select = new CustomSelect();
    select.init();
  });
});
