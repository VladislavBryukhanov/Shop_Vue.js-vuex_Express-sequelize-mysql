import { errorHandler } from '@/common/errorHandler';
import axios from 'axios';
const axiosUsers = axios.create({
  baseURL: `${process.env.VUE_APP_CORE_API}/users`,
  withCredentials: true
});

export default {
  async fetchRoleList({ commit }) {
    try {
      const { data: roles } = await axiosUsers.get('/fetch_role_list');
      commit('fetchRoleList', roles);
    } catch (err) {
      errorHandler(err, 'FetchRoleList', commit);
    }
  },
  async fetchUsers({ commit }, paging) {
    const { currentPage, limit } = paging;
    const offset = (currentPage - 1) * limit;

    try {
      const { data: users } = await axiosUsers.get('/fetch_users', {
        params: { offset, limit }
      });

      commit('fetchUsers', users);
    } catch (err) {
      errorHandler(err, 'FetchUsers', commit);
    }
  },
  async updateUserRole({ commit }, { role, id }) {
    try {
      await axiosUsers.put(`/update_role/${id}`, { role });
      commit('updateUserRole', { role, id } );
    } catch (err) {
      errorHandler(err, 'UpdateUserRole', commit);
    }
  }
};
