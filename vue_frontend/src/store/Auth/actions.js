import axios from 'axios';
const axiosAuth = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const errorHandler = (err, action, commit) => {
  if (err.response.status === 401) {
    commit('signOut');
  } else {
    commit('Common/showSnackbar', {
      message: `${action}: ${err.response.data}`,
      duration: 2000
    }, { root: true });
  }
};

export default {
  async signIn({ commit, dispatch }, credentials) {
    try {
      await axiosAuth.post('/sign_in', credentials);
      await dispatch('getMe');
    } catch (err) {
      errorHandler(err, 'SignIn', commit);
    }
  },
  async signUp({ commit, dispatch }, user) {
    try {
      await axiosAuth.post('/sign_up', user);
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
