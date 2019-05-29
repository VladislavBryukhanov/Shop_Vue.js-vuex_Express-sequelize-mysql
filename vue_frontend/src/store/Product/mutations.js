export default {
  fetchCategories(state, categories) {
    // TODO infinity scroll
    state.categories = categories;
  },
  //Data will be refreshed after any changes so mutate list is not needed
  fetchProducts(state, products) {
    // TODO caching all loaded products
    state.products = products;
  },
  createProduct(state) {
    state.products = {
      ...state.products,
      count: state.products.count + 1
    };
  },
  deleteProductById(state) {
    state.products = {
      ...state.products,
      count: state.products.count - 1
    }
  },
};
