import _ from 'lodash';

export default {
  fetchRoleList(state, roles) {
    state.availableRoles = roles;
  },
  fetchUsers(state, users) {
    state.users = users.rows;
    state.usersCount = users.count;
  },
  updateUserRole(state, { role, id }) {
    const index = _.findIndex(state.users, { id });
    const updatedUser = state.users[index];

    updatedUser.Role = role;
    state.users.splice(index, 1, updatedUser);
  }
};
