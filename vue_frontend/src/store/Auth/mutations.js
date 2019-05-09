import AuthState from '@/models/constants';

export default {
  signIn(state) {
    state.authState = AuthState.SignedIn;
  },
  signUp(state) {
    state.authState = AuthState.SignedIn;
  },
  getMe(state, me) {
    state.me = me;
  },
  signOut(state) {
    state.me = null;
    state.authState = AuthState.SignedOut;
  },
};
