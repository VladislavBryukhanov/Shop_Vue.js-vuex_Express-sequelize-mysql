const sequelize = require('../db/connection');
const Sequelize = require('sequelize');

const Session = sequelize.define('Session', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000)
});

module.exports = Session;
