const Sequelize = require('sequelize');
const sequelize = require('../connection');

const Role = sequelize.define('Roles', {
    name: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: 'This role already exists'
        },
        allowNull: false,
    }
});

module.exports = Role;
