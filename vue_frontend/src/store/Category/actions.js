import { errorHandler } from '@/common/errorHandler';
import axios from 'axios';
const axiosCategory = axios.create({
  baseURL: `${process.env.VUE_APP_CORE_API}/categories`,
  withCredentials: true,
});

export default {
  async fetchCategories({ commit }) {
    try {
      const { data: categories } = await axiosCategory.get(`/fetch_categories`);
      commit('fetchCategories', categories);
    } catch (err) {
      errorHandler(err, 'FetchCategories', commit);
    }
  },
  async createCategory({ commit }, categoryName) {
    try {
      const { data: category } = await axiosCategory.post(`/create_category`, { categoryName });
      commit('createCategory', category);
    } catch (err) {
      errorHandler(err, 'CreateCategory', commit);
    }
  },
  async removeCategory({ commit }, categoryId) {
    try {
      await axiosCategory.delete(`/remove_category/${categoryId}`);
      commit('removeCategory', categoryId);
    } catch (err) {
      errorHandler(err, 'RemoveCategory', commit);
    }
  }
};
