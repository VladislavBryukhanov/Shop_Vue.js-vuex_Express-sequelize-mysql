const User = require('../models/User');

exports.signUp = async (body, logIn) => {
    const user = await User.create(body);
    return new Promise((reject, resolve) => {
        logIn(user, (err) => {
            if (err) { reject(err); }
            resolve(user);
        });
    });
};
