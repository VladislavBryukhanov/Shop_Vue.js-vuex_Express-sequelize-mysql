const sequelize = require('../connection');
const Sequelize = require('sequelize');

const Cart = sequelize.define('Cart', {
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
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

module.exports = Cart;
