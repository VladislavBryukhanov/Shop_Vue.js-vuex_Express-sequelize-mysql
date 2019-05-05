import axios from 'axios';

export default {
  async signIn({ commit, dispatch }, credentials) {
    await axios.post('sign_in', credentials);
    dispatch('getMe');
  },
  async signUp({ commit, dispatch }, user) {
    await axios.post('sign_up', user);
    dispatch('getMe');
  },
  async getMe({ commit }) {
    const me = await axios.get('me');
    commit('me', me);
  }
};
