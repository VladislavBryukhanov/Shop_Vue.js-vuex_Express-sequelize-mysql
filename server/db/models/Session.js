const Sequelize = require('sequelize');
const sequelize = require('../connection');

const Session = sequelize.define('Sessions', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000)
});

module.exports = Session;
