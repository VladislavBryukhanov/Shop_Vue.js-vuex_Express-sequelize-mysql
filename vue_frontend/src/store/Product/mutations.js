export default {
  fetchCategories(state, categories) {
    // TODO infinity scroll
    state.categories = categories;
  },
  fetchProducts(state, products) {
    state.products = products;
  },
  addProduct(state, product) {
    // FIXME ??? вроде реактивности не будет
    state.products.rows.push(product);
  },
  updateProduct(state, product) {
    state.products.splice(index, 1, product);
  },
  deleteProductById(state, id) {
    const index = state.products.findIndex(item => item.id === id);
    state.products.splice(index, 1);
  },
};
