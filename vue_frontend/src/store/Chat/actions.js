import io from 'socket.io-client';
import moment from 'moment';
// const socket = io(`${process.env.VUE_APP_CORE_API}`);
let socket;

export default {
  initConnection({ commit }) {
    socket = io(`${process.env.VUE_APP_CORE_API}`);
    socket.on('message_sent', message => {
      commit('messageReceived', message);
    });
  },
  fetchMessages({ commit }, paging) {
    socket.on('messages_fetched', messages => {
      commit('fetchMessages', messages);
    });
    socket.emit('fetch_messages', paging);
  },
  sendMessage({ commit, rootState }, messageContent) {
    socket.emit('send_message', {
      textContent: messageContent,
      timestamp: moment(),
      // UserId: rootState.Auth.me.id
    });
  },
  closeConnection() {
    socket.disconnect();
  }
}
