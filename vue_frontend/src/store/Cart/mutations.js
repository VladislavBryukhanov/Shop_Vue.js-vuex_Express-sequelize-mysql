export default {
  fetchShoppingCart(state, { productsIds, totalCost }) {
    state.productIds = productsIds;
    state.totalCost = totalCost;
    state.productsCount = productsIds.length;
  },
  fetchCartProducts(state, products) {
    state.products = products;
  },
  insertCartProduct(state, product) {
    state.products.push(product);
  },
  //Data will be refetched
  excludeCartProduct(state, productId) {
    // const productIndex = state.products.findIndex(item => item.id === productId);
    // state.products.splice(productIndex, 1);
    state.productsCount = state.productsCount - 1;
  }
};
