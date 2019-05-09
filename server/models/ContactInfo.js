const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const ContactInfo = sequelize.define('ContactInfo', {
    phone: {
        type: Sequelize.NUMBER(),
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    zipcode: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = ContactInfo;