import actions from './actions';
import mutations from './mutations';

export const state = {
  totalCost: 0,
  productsCount: 0,
  productIds: [],
  products: []
};

export const Cart = {
  namespaced: true,
  state,
  actions,
  mutations,
};
