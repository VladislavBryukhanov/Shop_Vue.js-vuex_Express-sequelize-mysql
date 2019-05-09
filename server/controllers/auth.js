const User = require('../models/User');

exports.signIn = () => {

};

exports.signUp = async (user) => {
    return User.create(user);
};

exports.getMe = () => {

};