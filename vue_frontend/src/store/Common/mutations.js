export default {
  showSnackbar(state, snackbar) {
    state.snackbar = {
      visible: true,
      ...snackbar
    };
  },
  hideSnackbar(state) {
    state.snackbar = {
      visible: false,
      message: '',
      duration: 500,
    };
  },
};
