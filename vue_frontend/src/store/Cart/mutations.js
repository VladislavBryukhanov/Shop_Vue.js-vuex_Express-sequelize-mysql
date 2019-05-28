export default {
  fetchShoppingCart(state, { productsIds, totalCost }) {
    state.productIds = productsIds;
    state.totalCost = totalCost;
    state.productsCount = productsIds.length;
  },
  fetchCartProducts(state, products) {
    state.products = products;
  }
};
