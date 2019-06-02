const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 12; //2-3 hashes/sec
const passport = require('passport');
const { roles } = require('../common/constants');

exports.signUp = async (request, response) => {
    const transaction = await models.sequelize.transaction();

    try {
        const { user, contactInfo } = request.body;
        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt);

        const RoleId = await models.Role.findOne({
            where: { name: roles.USER },
            attributes: ['id'],
        }).then(res => res.id);

        //atomic creating of contact info and user - creation can throw error on duplicate email for User and duplicate phone for ContactInfo so need rollback both if any error
        const createdUser = await models.User.create({...user, RoleId }, { transaction });
        await createdUser.createContactInfo(contactInfo, { transaction });
        await transaction.commit();

        request.logIn(createdUser, err => {
            if (err) {
                return response
                    .status(500)
                    .send("Can't authorize new user");
            }
            response.sendStatus(201);
        });
    } catch (err) {
        await transaction.rollback();
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
