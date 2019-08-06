import { errorHandler } from '@/common/errorHandler';
import axios from 'axios';
const axiosOrder = axios.create({
  baseURL: `${process.env.VUE_APP_CORE_API}/order`,
  withCredentials: true
});

export default {
  async fetchOrders({ commit }, paging) {
    const { currentPage, limit } = paging;
    const offset = (currentPage - 1) * limit;

    try {
      const { data: orders } = await axiosOrder.get('/fetch_orders', {
        params: { offset, limit }
      });

      commit('fetchOrders', orders);
    } catch (err) {
      errorHandler(err, 'FetchOrders', commit);
    }
  },
  async fetchUsersOrder({ commit }, id) {
    try {
      const { data: orders } = await axiosOrder.get(`/fetch_users_order/${id}`);
      commit('fetchOrders', orders);
    } catch (err) {
      errorHandler(err, 'FetchPersonalOrders', commit);
    }
  },
  async fetchPersonalOrders({ commit }) {
    try {
      const { data: orders } = await axiosOrder.get('/fetch_personal_orders');
      commit('fetchPersonalOrders', orders);
    } catch (err) {
      errorHandler(err, 'FetchPersonalOrders', commit);
    }
  },
  async createPersonalOrder({ commit }, productIds) {
    try {
      await axiosOrder.post('/create_personal_order', { productIds });
    } catch (err) {
      errorHandler(err, 'CreatePersonalOrder', commit);
    }
  },
  async declineOrder({ commit }, orderId) {
    try {
      await axiosOrder.delete(`/decline_order/${orderId}`);
      commit('declineOrder', orderId);
    } catch (err) {
      errorHandler(err, 'DeclineOrder', commit);
    }
  }
};
