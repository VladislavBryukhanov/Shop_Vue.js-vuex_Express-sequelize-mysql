import axios from 'axios';

export default {
  async signIn({ commit, dispatch }, credentials) {
    try {
      await axios.post('sign_in', credentials);
      dispatch('getMe');
    } catch (err) {
      commit('Common/showSnackbar', {
        message: `SignIn: ${err.message}`,
        duration: 1500
      }, { root: true })
    }
  },
  async signUp({ commit, dispatch }, user) {
    try {
      await axios.post('sign_up', user);
      dispatch('getMe');
    } catch (err) {
      commit('Common/showSnackbar', {
        message: `SignUp: ${err.message}`,
        duration: 1500
      }, { root: true })
    }
  },
  async getMe({ commit }) {
    try {
      const me = await axios.get('me');
      commit('me', me);
    } catch (err) {
      commit('Common/showSnackbar', {
        message: `getMe: ${err.message}`,
        duration: 1500
      }, { root: true })
    }
  }
};
