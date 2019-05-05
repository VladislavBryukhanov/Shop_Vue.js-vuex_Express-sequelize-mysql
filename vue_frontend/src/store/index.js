import Vue from 'vue';
import Vuex from 'vuex';
import { Auth } from './Auth';
import { Common } from './Common';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Common,
    Auth,
  }
});

export default store;
