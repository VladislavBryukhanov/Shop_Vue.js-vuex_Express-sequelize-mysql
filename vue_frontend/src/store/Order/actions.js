import { errorHandler } from '@/common/errorHandler';
import axios from 'axios';
const axiosOrder = axios.create({
  baseURL: `${process.env.VUE_APP_CORE_API}/order`,
  withCredentials: true
});

export default {
  async createPersonalOrder({ commit }, productIds) {
    try {
      const cart = await axiosOrder.post('/create_personal_order', { productIds })
        .then(res => res.data);
      commit('createPersonalOrder', cart);
    } catch (err) {
      errorHandler(err, 'CreatePersonalOrder', commit);
    }
  },
};
