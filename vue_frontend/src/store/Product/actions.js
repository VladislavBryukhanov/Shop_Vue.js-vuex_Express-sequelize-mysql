import axios from 'axios';
const axiosProduct = axios.create({
  baseURL: 'http://localhost:3000/products',
  withCredentials: true,
});

const errorHandler = (err, action, commit) => {
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
  async fetchCategories({ commit }, paging) {
    // const { page, limit } = paging;
    try {
      // const categories = await axiosProduct.get(`/categories/${page * limit}&${limit}`)
      const categories = await axiosProduct.get(`/categories`)
        .then(res => res.data);
      commit('fetchCategories', categories);
    } catch (err) {
      errorHandler(err, 'FetchCategories', commit);
    }
  },
  async fetchProducts({ commit }) {
    try {
      const products = await axiosProduct.get('/fetch_products')
        .then(res => res.data);
      commit('fetchProducts', products);
    } catch (err) {
      errorHandler(err, 'FetchProducts', commit);
    }
  },
  async addProduct({ commit }, product) {
    try {
      const res_prod = await axiosProduct.post('/add_products', product)
        .then(res => res.data);
      commit('fetchProducts', res_prod);
    } catch (err) {
      errorHandler(err, 'FetchProducts', commit);
    }
  },
  async updateProduct({ commit }, product) {
    try {
      const res_prod = await axiosProduct.put('/update_product', product)
        .then(res => res.data);
      commit('updateProduct', res_prod);
    } catch (err) {
      errorHandler(err, 'FetchProducts', commit);
    }
  },
  async deleteProductById({ commit }, id) {
    try {
      await axiosProduct.delete('/delete_product', id);
      commit('deleteProductById', id);
    } catch (err) {
      errorHandler(err, 'FetchProducts', commit);
    }
  },
};
