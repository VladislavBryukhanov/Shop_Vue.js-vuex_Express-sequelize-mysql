import Vue from 'vue';

import imagePathFilter from './filters/imagePath';
import priceFilter from './filters/price';
import dateFormat from './filters/dateFormat';

export default () => {
  Vue.filter(priceFilter.id, priceFilter.definition);
  Vue.filter(imagePathFilter.id, imagePathFilter.definition);
  Vue.filter(dateFormat.id, dateFormat.definition);
};
