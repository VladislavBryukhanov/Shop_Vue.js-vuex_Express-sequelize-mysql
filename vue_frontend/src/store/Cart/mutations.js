export default {
  cartProductsCount(state, productsCount) {
    state.productsCount = productsCount;
  },
  fetchCartProducts(state, products) {
    state.products = products;
  },
  insertCartProduct(state, product) {
    state.products.push(product);
  },
  excludeCartProduct(state, productId) {
    const index = state.products.findIndex(item => item.id === productId);
    state.products.splice(index, 1);
  }
};
