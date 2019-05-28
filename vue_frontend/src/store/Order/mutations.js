export default {
  fetchOrders(state, orderIds) {
    state.orders = orderIds;
  },
  fetchPersonalOrders(state, orderIds) {
    state.orders = orderIds;
  },
  declineOrder(state, deletedOrder) {
    const index = state.orders.findIndex(order => order.id === deletedOrder);
    state.orders.splice(index, 1);
  }
}
