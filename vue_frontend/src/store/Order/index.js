import actions from './actions';
import mutations from './mutations';

export const state = {
  totalCost: 0,
  orderIds: [],
};

export const Order = {
  namespaced: true,
  state,
  actions,
  mutations,
};
