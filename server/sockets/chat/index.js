const io = require('socket.io')();
const models = require('../../models');
const users = [];

io.on('connection', async (socket) => {
    if (!socket.request.session.passport) {
        return new Error('Authentication error');
    }

    const userId = socket.request.session.passport.user;
    const user = await models.User.findByPk(userId);

    //For user - one chat, for management - list and diff login
    let [ chat ] = await user.getChats();
    if (!chat) {
        console.info('CRT');
        chat = await user.createChat();
    }
    //

    users.push({
        ...user.get({ plain: true }),
        socketId: socket.id
    });

    // serialize + role checking
    if (user.id === 1) {
        socket.join('managers');
    }

    socket.on('fetch_messages', async (query) => {
     /*   const interlocutors = await chat.getMessages({
            attributes: [
                [models.Sequelize.fn('DISTINCT', models.Sequelize.col('UserId')), 'UserId'],
            ]
        });
        console.info(interlocutors);*/

        const messages = await chat.getMessages();
        socket.emit('messages_fetched', messages);
    });

    socket.on('send_message', async (message) => {
        message.UserId = userId;

        try {
            await chat.createMessage(message);
        } catch (err) {
            console.error(err);
            return new Error(err);
        }

        // Message to self - notify that msg delivered
        socket.emit('message_sent', message);

        // if manager
        if (userId === 1) {
            const someUserId = userId;
            const { socketId } = users.find(user => user.id === someUserId);
            return io.sockets.connected[socketId].emit('message_sent', message);
        }
        socket.to('managers').emit('message_sent', message);
    });

    socket.on('disconnect', () => {
        const userId = socket.request.session.passport.user;
        const index = users.findIndex(user => userId === user.uid);
        users.splice(index, 1);
    });
});

module.exports = io;
