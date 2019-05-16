import Vue from 'vue';

import imagePathFilter from './imagePath';

export default () => {
  Vue.filter(imagePathFilter.id, imagePathFilter.definition);
};
