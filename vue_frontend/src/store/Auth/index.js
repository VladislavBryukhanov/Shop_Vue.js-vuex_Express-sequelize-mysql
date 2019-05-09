import actions from './actions';
import mutations from './mutations';

export const state = {
  me: null,
  authState: null,
};

export const Auth =  {
  namespaced: true,
  state,
  actions,
  mutations,
};
