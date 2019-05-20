const Sequelize = require('sequelize');
const sequelize = require('../connection');

const Category = sequelize.define('Categories', {
    name: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: 'This category already exists'
        },
        allowNull: false,
    }
});

module.exports = Category;
