export default {
  messageReceived(state, message) {
    state.messages.push(message);
  },
  fetchMessages(state, messages) {
    state.messages = messages;
    /*state.messages = [
      ...state.messages,
      ...messages
    ];*/
  }
}
