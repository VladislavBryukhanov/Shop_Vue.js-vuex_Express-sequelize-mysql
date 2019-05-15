const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const Category = sequelize.define('category', {
    name: {
        type: Sequelize.STRING,
        isUnique: true,
        allowNull: false,
    }
});

module.exports = Category;
