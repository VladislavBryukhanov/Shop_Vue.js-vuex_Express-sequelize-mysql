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
      const orders = await axiosOrder.get('/fetch_orders', {
        params: { offset, limit }
      }).then(res => res.data);

      commit('fetchOrders', orders);
    } catch (err) {
      errorHandler(err, 'FetchOrders', commit);
    }
  },
  async fetchPersonalOrders({ commit }) {
    try {
      const orders = await axiosOrder.get('/fetch_personal_orders')
        .then(res => res.data);
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
