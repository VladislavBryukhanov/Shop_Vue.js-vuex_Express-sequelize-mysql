const User = require('../models/User');
// const passport = require('../auth/passport');
const passport = require('passport');

exports.signIn = async ({ login }) => {
/*    console.error(passport.authenticate);
    passport.authenticate('local', { session: true }, (err, user, info) => {
        console.error('-----------------------');
        console.error(err);
        login(user, err => console.error(err));
    });*/
};

exports.signUp = async ({ body, login }) => {
    const user = await User.create(body);
    login(user);
};

exports.signOut = async ({ logout }) => {
    await logout();
};

exports.getMe = () => {

};