export default {
  fetchOrders(state, orderIds) {
    state.orderIds = orderIds;
  },
  fetchPersonalOrders(state, orderIds) {
    state.orderIds = orderIds;
  },
  createPersonalOrder(state, orderId) {
    state.orderIds.push(orderId);
  }
}
