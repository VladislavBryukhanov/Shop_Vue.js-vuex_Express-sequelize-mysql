const chatSocket = require('socket.io')();

chatSocket.on('connection', (conn) => {
    conn.on('fetch_messages', (query) => {
        console.info(query);
    });

    conn.on('message_sent', (query) => {
        console.info('message_sent');
        console.info(query);
    });

    conn.on('send_message', (message) => {
        // conn.broadcast.emit('message_sent', message);
        console.info('send_message')
        conn.broadcast.emit('message_sent', message);
        conn.emit('message_sent', message);
    });

    conn.on('close', () => {});
});

module.exports = chatSocket;
