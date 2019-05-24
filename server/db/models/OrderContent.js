const sequelize = require('../connection');
const Sequelize = require('sequelize');

const OrderContent = sequelize.define('OrderContent', {
    OrderId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
            model: 'Orders',
            key: 'id'
        }
    },
    ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    }
});

module.exports = OrderContent;
