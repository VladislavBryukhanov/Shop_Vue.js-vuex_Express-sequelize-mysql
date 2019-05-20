const Sequelize = require('sequelize');
const sequelize = require('../connection');

const Product = sequelize.define('Products', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validation: {
            len: [1, 64]
        }
    },
    description: {
        type: Sequelize.TEXT,
        validation: {
            len: [1, 512]
        }
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validation: {
            min: 0
        }
    },
    previewPhoto: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    // categoryId: {
    //     type: Sequelize.INTEGER,
    //     foreignKey: true,
    //     allowNull: false,
    //     references: {
    //         model: 'Categories',
    //         key: 'id'
    //     }
    // }
});

module.exports = Product;
