const Sequelize = require('sequelize');
const sequelize = require('../connection');

const Category = sequelize.define('category', {
    name: {
        type: Sequelize.STRING,
        isUnique: true,
        allowNull: false,
    }
});

module.exports = Category;
