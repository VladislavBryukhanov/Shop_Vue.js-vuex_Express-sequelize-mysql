import actions from './actions';
import mutations from './mutations';

export const state = {
  products: [],
  productsCount: 0
};

export const Cart = {
  namespaced: true,
  state,
  actions,
  mutations,
};
