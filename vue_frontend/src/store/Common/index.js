import mutations from './mutations';

export const state = {
  snackbar: {
    message: '',
    duration: 500,
  },
};

export const Common =  {
  namespaced: true,
  state,
  mutations,
};
