const Sequelize = require('sequelize');
const sequelize = require('../connection');

const ContactInfo = sequelize.define('ContactInfo', {
    phone: {
        type: Sequelize.INTEGER,
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
