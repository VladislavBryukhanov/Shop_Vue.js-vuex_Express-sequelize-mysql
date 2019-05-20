import Vue from 'vue';

import imagePathFilter from './filters/imagePath';
import priceFilter from './filters/price';

export default () => {
  Vue.filter(priceFilter.id, priceFilter.definition);
  Vue.filter(imagePathFilter.id, imagePathFilter.definition);
};
