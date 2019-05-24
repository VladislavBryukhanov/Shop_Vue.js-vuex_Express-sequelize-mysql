export const errorHandler = (err, action, commit, delay = 2000) => {
  if (!err.response) {
    return console.error(err);
  }

  const { status, data } = err.response;

  if (status === 401 || status === 403) {
    commit('signOut');
  } else {
    commit('Common/showSnackbar', {
      message: `${action}: ${data}`,
      duration: delay
    }, { root: true });
  }
};
