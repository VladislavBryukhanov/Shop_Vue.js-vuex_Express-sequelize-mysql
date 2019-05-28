import Vue from 'vue';

import infinityScroll from './directives/infinityScroll';

export default () => {
  Vue.directive(infinityScroll.id, infinityScroll.definition);
};
