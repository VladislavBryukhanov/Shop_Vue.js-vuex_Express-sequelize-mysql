import io from 'socket.io-client';
import moment from 'moment';
import { errorHandler } from '@/common/errorHandler';
let socket;

export default {
  initConnection({ commit }) {
    socket = io(`${process.env.VUE_APP_CORE_API}`);
    socket.on('error', err => {
      errorHandler(err, 'ChatSocket', commit);
    })
  },
  openChat({}, interlocutorId) {
    socket.emit('open_chat', interlocutorId);

    return new Promise((resolve, reject) => {
      socket.on('chat_opened', () => {
        resolve();
      });
    });
  },
  fetchMessages({ commit }, paging) {
    socket.on('message_sent', message => {
      commit('messageReceived', message);
    });
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
