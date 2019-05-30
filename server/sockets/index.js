const chatSocket = require('./chat');

module.exports.init = (server) => {
    chatSocket.attach(server, { cookie: true });
};
