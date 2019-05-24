import { errorHandler } from '@/common/errorHandler';
import axios from 'axios';
const axiosAuth = axios.create({
  baseURL: process.env.VUE_APP_CORE_API,
  withCredentials: true,
});

export default {
  async signIn({ commit, dispatch }, credentials) {
    try {
      await axiosAuth.post('/sign_in', credentials);
      await dispatch('getMe');
    } catch (err) {
      errorHandler(err, 'SignIn', commit);
    }
  },
  async signUp({ commit, dispatch }, body) {
    try {
      await axiosAuth.post('/sign_up', body);
      await dispatch('getMe');
    } catch (err) {
      errorHandler(err, 'SignUp', commit);
    }
  },
  async signOut({ commit }) {
    try {
      await axiosAuth.post('/sign_out');
      commit('signOut');
    } catch (err) {
      errorHandler(err, 'signOut', commit);
    }
  },
  async getMe({ commit }) {
    try {
      const me = await axiosAuth.get('/me')
        .then(res => res.data);
      commit('getMe', me);
    } catch (err) {
      errorHandler(err, 'getMe', commit);
    }
  },
};
