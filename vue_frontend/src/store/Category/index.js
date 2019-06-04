import actions from './actions';
import mutations from './mutations';

export const state = {
  categories: [],
};

export const Category =  {
  namespaced: true,
  state,
  actions,
  mutations,
};
