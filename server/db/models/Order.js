const sequelize = require('../connection');
const Sequelize = require('sequelize');

const Order = sequelize.define('Order', {
    UserId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
});

module.exports = Order;
