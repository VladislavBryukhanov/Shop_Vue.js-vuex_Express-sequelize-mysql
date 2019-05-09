const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (username, password, done) => {
    console.log('++++++++++++++++++')
    try {
        const user = await User.findOne({
            where: {
                email: username,
                password
            }
        });
        console.log('\\\\\\')
        console.log(user)
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    console.log('-------------------')
    console.log(user)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('========================')
    User.findOne({ where: { id }})
        .then(user => done(null, user));
});

module.exports = passport;