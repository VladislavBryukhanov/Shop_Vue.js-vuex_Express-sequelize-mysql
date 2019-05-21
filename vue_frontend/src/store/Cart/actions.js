import axios from 'axios';

const axiosCart = axios.create({
  baseURL: `${process.env.VUE_APP_CORE_API}/cart`,
  withCredentials: true
});

const errorHandler = (err, action, commit) => {
  if (!err.response) {
    return console.error(err);
  }
  if (err.response.status === 403) {
    commit('signOut');
  } else {
    commit('Common/showSnackbar', {
      message: `${action}: ${err.response.data}`,
      duration: 2000
    }, { root: true });
  }
};

export default {
  async cartProductsCount({ commit }) {
    try {
      const productsCount = await axiosCart.get('/products_count');
      commit('cartProductsCount', productsCount);
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
  async insertCartProduct({ commit }, productId) {
    try {
      const product = await axiosCart.post('/insert_product', { productId })
        .then(res => res.data);
      commit('insertCartProduct', product);
    } catch (err) {
      errorHandler(err, 'InsertProduct', commit);
    }
  },
  async excludeCartProduct({ commit }, productId) {
    try {
      await axiosCart.delete(`/exclude_product/${productId}`);
      commit('excludeCartProduct', productId);
    } catch (err) {
      errorHandler(err, 'ExcludeProduct', commit);
    }
  }
};
