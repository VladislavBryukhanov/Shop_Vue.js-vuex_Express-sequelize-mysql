export default {
  fetchCategories(state, categories) {
    // TODO infinity scroll
    state.categories = categories;
  },
  fetchProducts(state, products) {
    // TODO caching all loaded products
    state.products = products;
  },
  //Data will be refetched
  createProduct(state, product) {
    state.products = {
      ...state.products,
      count: state.products.count + 1
/*    rows: [
       ...state.products.rows,
       product
     ],*/
    };
  },
  updateProduct(state, product) {
    const rows = state.products.rows.map(item => {
      if (item.id !== product) {
        return product;
      }
      return item;
    });

    state.products = {
      ...state.products,
      rows,
    }
  },
  //Data will be refetched
  deleteProductById(state, id) {
    // const rows = state.products.rows.filter(item => item.id !== id);

    state.products = {
      // rows,
      ...state.products,
      count: state.products.count - 1
    }
  },
};
