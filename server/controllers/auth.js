const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 12; //2-3 hashes/sec
const passport = require('passport');

exports.signUp = async (request, response) => {
    try {
        const { user, contactInfo } = request.body;
        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt);

        //TODO atomic creating of contact info and phone
        const createdUser = await models.User.create(user);

        //set default role
        const userRole = await models.Role.findOne({ where: { name: 'User' } });
        await createdUser.setRole(userRole);

        contactInfo.UserId = createdUser.id;
        createdUser.createContactInfo(contactInfo);
        // await models.ContactInfo.create(contactInfo)
        //     .then(res => res.id);

        request.logIn(createdUser, err => {
            if (err) {
                return response
                    .status(500)
                    .send("Can't authorize new user");
            }
            response.sendStatus(201);
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

            response.sendStatus(200);
        });
    })(request, response, next);
};
