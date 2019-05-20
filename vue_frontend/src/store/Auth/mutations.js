import { AuthState } from '@/common/constants';

export default {
  signOut(state) {
    state.me = null;
    state.authState = AuthState.SignedOut;
  },
  getMe(state, me) {
    state.me = me;
    state.authState = AuthState.SignedIn;
  },
};
