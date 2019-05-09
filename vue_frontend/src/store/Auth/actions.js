import axios from 'axios';
const axiosAuth = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

const errorHandler = (err, action, commit) => {
  console.error(err);

  commit('Common/showSnackbar', {
    message: `${action}: ${err.message}`,
    duration: 2000
  }, { root: true });

  if (err.status === 401) {
    commit('sign_out');
  }
};

export default {
  async signIn({ commit, dispatch }, credentials) {
    try {
      await axiosAuth.post('/sign_in', credentials);
      dispatch('getMe');
    } catch (err) {
      errorHandler(err, 'SignIn', commit);
    }
  },
  async signUp({ commit, dispatch }, user) {
    try {
      await axiosAuth.post('/sign_up', user);
      dispatch('getMe');
    } catch (err) {
      errorHandler(err, 'SignUp', commit);
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
  async signOut({ commit }) {
    try {
      await axiosAuth.post('/sign_out');
      commit('sign_out');
    } catch (err) {
      errorHandler(err, 'signOut', commit);
    }
  },
};
