import { errorHandler } from '@/common/errorHandler';
import axios from 'axios';
const axiosProduct = axios.create({
  baseURL: `${process.env.VUE_APP_CORE_API}/products`,
  withCredentials: true,
});

export default {
  async fetchTopProducts({ commit }, query) {
    const { currentPage, limit, searchQuery } = query;
    const offset = (currentPage - 1) * limit;
    const params = {
      offset,
      limit,
      searchQuery,
    };

    try {
      const products = await axiosProduct.get(`/top_products`, { params })
        .then(res => res.data);
      commit('fetchProducts', products);
    } catch (err) {
      errorHandler(err, 'FetchProducts', commit);
    }
  },
  async fetchProducts({ commit }, query) {
    const { currentPage, limit, category, searchQuery } = query;
    const offset = (currentPage - 1) * limit;
    const params = {
      offset,
      limit,
      category,
      searchQuery,
    };

    try {
      const products = await axiosProduct.get(`/products`, { params })
        .then(res => res.data);
      commit('fetchProducts', products);
    } catch (err) {
      errorHandler(err, 'FetchProducts', commit);
    }
  },
  async createProduct({ commit }, product) {
    try {
      await axiosProduct.post('/create_products', product);
      commit('createProduct');
    } catch (err) {
      errorHandler(err, 'CreateProduct', commit);
    }
  },
  async updateProduct({ commit }, product) {
    try {
      await axiosProduct.put('/update_product', product)
    } catch (err) {
      errorHandler(err, 'UpdateProduct', commit);
    }
  },
  async deleteProductById({ commit }, id) {
    try {
      await axiosProduct.delete(`/delete_product/${id}`);
      commit('deleteProductById');
    } catch (err) {
      errorHandler(err, 'DeleteProducts', commit);
    }
  },
};
