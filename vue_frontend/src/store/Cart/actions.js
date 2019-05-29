import { errorHandler } from '@/common/errorHandler';
import axios from 'axios';
const axiosCart = axios.create({
  baseURL: `${process.env.VUE_APP_CORE_API}/cart`,
  withCredentials: true
});

//TODO Cart and Prod logic should be the same = client side or server side only calculating, now cart -serverside, prod - clientside
export default {
  async fetchShoppingCart({ commit }) {
    try {
      const cart = await axiosCart.get('/fetch_shopping_cart')
        .then(res => res.data);
      commit('fetchShoppingCart', cart);
    } catch (err) {
      errorHandler(err, 'FetchShoppingCart', commit);
    }
  },
  async fetchCartProducts({ commit }, paging) {
    const { currentPage, limit } = paging;
    const offset = (currentPage - 1) * limit;

    try {
      const products = await axiosCart.get('/fetch_products', {
        params: { offset, limit }
      }).then(res => res.data);

      commit('fetchCartProducts', products);
    } catch (err) {
      errorHandler(err, 'FetchCart', commit);
    }
  },
  async insertCartProduct({ commit, dispatch }, productId) {
    try {
      await axiosCart.post('/insert_product', { productId });
      //Fixme Is it optimal solution? Mb client side?
      dispatch('fetchShoppingCart');
    } catch (err) {
      errorHandler(err, 'InsertProduct', commit);
    }
  },
  async excludeCartProduct({ commit, dispatch }, productId) {
    try {
      await axiosCart.delete(`/exclude_product/${productId}`);
      //Fixme Is it optimal solution? Mb client side?
      dispatch('fetchShoppingCart');
    } catch (err) {
      errorHandler(err, 'ExcludeProduct', commit);
    }
  }
};
