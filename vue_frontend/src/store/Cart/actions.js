import { errorHandler } from '@/common/errorHandler';
import axios from 'axios';
const axiosCart = axios.create({
  baseURL: `${process.env.VUE_APP_CORE_API}/cart`,
  withCredentials: true
});

export default {
  async cartProductsCount({ commit }) {
    try {
      const productsCount = await axiosCart.get('/products_count')
        .then(res => res.data.count);
      commit('cartProductsCount', productsCount);
    } catch (err) {
      errorHandler(err, 'CartProductsCount', commit);
    }
  },
  async cartProductsTotalCost({ commit }) {
    try {
      const totalCost = await axiosCart.get('/total_cost')
        .then(res => res.data.price);
      commit('cartProductsTotalCost', totalCost);
    } catch (err) {
      errorHandler(err, 'CartProductsCount', commit);
    }
  },
  async fetchAllCartProductsId({ commit }) {
    try {
      const productsCount = await axiosCart.get('/fetch_products_id')
        .then(res => res.data.count);
      commit('fetchAllCartProductsId', productsCount);
    } catch (err) {
      errorHandler(err, 'CartProductsCount', commit);
    }
  },
  async fetchCartProducts({ commit }, paging) {
    const { currentPage, limit } = paging;
    const offset = (currentPage - 1) * limit;

    try {
      const products = await axiosCart.get(`/fetch_products/${offset}&${limit}`)
        .then(res => res.data);
      commit('fetchCartProducts', products);
    } catch (err) {
      errorHandler(err, 'FetchCart', commit);
    }
  },
  async insertCartProduct({ commit, state }, productId) {
    try {
      const product = await axiosCart.post('/insert_product', { productId })
        .then(res => res.data);
      commit('insertCartProduct', product);
      commit('cartProductsCount', state.productsCount + 1);
    } catch (err) {
      errorHandler(err, 'InsertProduct', commit);
    }
  },
  async excludeCartProduct({ commit, state }, productId) {
    try {
      await axiosCart.delete(`/exclude_product/${productId}`);
      commit('excludeCartProduct', productId);
      commit('cartProductsCount', state.productsCount - 1);
    } catch (err) {
      errorHandler(err, 'ExcludeProduct', commit);
    }
  }
};
