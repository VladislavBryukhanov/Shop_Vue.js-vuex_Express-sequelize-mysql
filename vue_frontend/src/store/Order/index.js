import actions from './actions';
import mutations from './mutations';

export const state = {
  orders: [],
};

export const Order = {
  namespaced: true,
  state,
  actions,
  mutations,
};
