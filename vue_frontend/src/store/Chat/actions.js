import io from 'socket.io-client';
import moment from 'moment';
// const socket = io(`${process.env.VUE_APP_CORE_API}`);
// const socket = io(`http://localhost:3005`);
// const socket = io('ws://localhost:3000');
const socket = io('http://localhost:3000');

export default {
  fetchMessages({ commit }) {
    socket.on('open', (messages) => {
      console.log(messages);
    });
    socket.on('message_sent', (message) => {
      console.info(message);
      commit('messageReceived', message);
    });
  },
  sendMessage({ commit }, messageContent) {
    socket.emit('send_message', {
      content: messageContent,
      timestamp: moment()
    });
  },
  closeChat() {
    socket.close();
  }
}
