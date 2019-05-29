import Vue from 'vue';
import Vuex from 'vuex';
import { Auth } from './Auth';
import { Common } from './Common';
import { Product } from './Product';
import { Cart } from './Cart';
import { Order } from './Order';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    Common,
    Product,
    Cart,
    Order,
  }
});

export default store;
