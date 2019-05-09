import axios from 'axios';
const axiosAuth = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export default {
  async signIn({ commit, dispatch }, credentials) {
    try {
      await axiosAuth.post('/sign_in', credentials);
      dispatch('getMe');
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
      await axiosAuth.post('/sign_up', user);
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
      const me = await axiosAuth.get('me');
      commit('/me', me);
    } catch (err) {
      commit('Common/showSnackbar', {
        message: `getMe: ${err.message}`,
        duration: 1500
      }, { root: true })
    }
  }
};
