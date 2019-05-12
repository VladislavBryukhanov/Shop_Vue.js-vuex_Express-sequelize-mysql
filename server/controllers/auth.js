const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10; //2-3 hashes/sec
const passport = require('passport');

exports.signUp = async (request, response) => {
    const { body } = request;
    const salt = await bcrypt.genSalt(saltRounds);
    body.password = await bcrypt.hash(body.password, salt);

    const user = await User.create(body);

    request.logIn(user, err => {
        if (err) {
            console.error(err);
            return response
                .status(400)
                .send("Can't create new user");
        }
        response.send(201);
    });
};

exports.signIn = async (request, response, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next(err);
        }

        if (info) {
            // Dev only, insecure
            const errorMessage = info.message;
            // const errorMessage = 'Invalid username or password.';

            return response
                .status(400)
                .send(errorMessage);
        }

        request.logIn(user, err => {
            if (err) {
                next(err);
            }

            response.send(200);
        });
    })(request, response, next);
};