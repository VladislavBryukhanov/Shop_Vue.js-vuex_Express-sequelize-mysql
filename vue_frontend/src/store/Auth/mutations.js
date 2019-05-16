import { AuthState } from '../../common/constants';

export default {
  signIn(state) {
    state.authState = AuthState.SignedIn;
  },
  signUp(state) {
    state.authState = AuthState.SignedIn;
  },
  signOut(state) {
    state.me = null;
    state.authState = AuthState.SignedOut;
  },
  getMe(state, me) {
    state.me = me;
  },
};
