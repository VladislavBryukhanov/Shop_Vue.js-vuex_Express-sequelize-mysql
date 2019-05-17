const User = require('../db/models/User');
const bcrypt = require('bcrypt');
const saltRounds = 12; //2-3 hashes/sec
const passport = require('passport');

exports.signUp = async (request, response) => {
    try {
        const { body } = request;
        const salt = await bcrypt.genSalt(saltRounds);
        body.password = await bcrypt.hash(body.password, salt);

        const user = await User.create(body);

        request.logIn(user, err => {
            if (err) {
                return response
                    .status(500)
                    .send("Can't authorize new user");
            }
            response.send(201);
        });
    } catch (err) {
        return response
            .status(500)
            .send(err.message);
    }
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
