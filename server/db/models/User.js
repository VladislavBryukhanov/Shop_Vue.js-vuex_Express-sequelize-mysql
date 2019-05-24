const Sequelize = require('sequelize');
const sequelize = require('../connection');

const User = sequelize.define('Users', {
    email: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: 'Email address already in use'
        },
        validate: {
            isEmail: true,
        },
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return () => this.getDataValue('password');
        },
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    birthDay: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    role: {
        type: Sequelize.STRING, //Fixme
        defaultValue: 'user',
        allowNull: false,
    }
});

module.exports = User;
