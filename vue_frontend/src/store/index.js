import Vue from 'vue';
import Vuex from 'vuex';
import { Auth } from './Auth';
import { Common } from './Common';
import { Product } from './Product';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    Common,
    Product,
  }
});

export default store;
