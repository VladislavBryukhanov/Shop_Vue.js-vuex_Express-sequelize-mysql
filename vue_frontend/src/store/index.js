import Vue from 'vue';
import Vuex from 'vuex';
import { Auth } from './Auth';
import { Common } from './Common';
import { Product } from './Product';
import { Cart } from './Cart';
import { Order } from './Order';
import { Chat } from './Chat';
import { User } from './User';
import { Category } from './Category';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    Common,
    Product,
    Cart,
    Order,
    Chat,
    User,
    Category,
  }
});

export default store;
