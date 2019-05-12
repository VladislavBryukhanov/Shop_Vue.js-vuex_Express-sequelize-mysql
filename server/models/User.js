const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        // FIXME не работает!!!!!!!!!!!!!!!!!!
        unique: {
            args: true,
            msg: 'Email address already in use!'
        },
        validate: {
            isEmail: true,
        },
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        // it is hash and validation useless
        // validate: {
        //     len: [8, 32],
        // },
        allowNull: false,
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
    //FIXME
    /*contactInfo: {
      type: Contact,
      allowNull: false
    },*/
    role: {
        type: Sequelize.STRING, //Fixme
        defaultValue: 'user',
        allowNull: false,
    }
});

module.exports = User;
