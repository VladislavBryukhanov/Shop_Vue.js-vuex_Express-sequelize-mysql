const Sequelize = require('sequelize');
const sequelize = require('../connection');

const ContactInfo = sequelize.define('ContactInfo', {
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    phone: {
        type: Sequelize.INTEGER,
        validate: {
            len: [4, 12],
            isNumeric: true
        },
        unique: {
            args: true,
            msg: 'Such phone already in use'
        },
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    // cities dropdown, zip code, etc ...
});

module.exports = ContactInfo;
