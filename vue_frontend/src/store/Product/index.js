import actions from './actions';
import mutations from './mutations';

export const state = {
  products: null,
  categories: {},
};

export const Product =  {
  namespaced: true,
  state,
  actions,
  mutations,
};
