import actions from './actions';
import mutations from './mutations';

export const state = {
  users: [],
  usersCount: [],
  availableRoles: []
};

export const User = {
  namespaced: true,
  state,
  actions,
  mutations,
};
