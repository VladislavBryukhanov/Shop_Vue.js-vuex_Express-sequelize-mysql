import actions from './actions';
import mutations from './mutations';

export const state = {
  messages: {},
};

export const Chat =  {
  namespaced: true,
  state,
  actions,
  mutations,
};
