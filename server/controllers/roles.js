const { Role } = require('../models');

module.exports.fetchRoles = async (request, response) => {
    try {
        const roles = await Role.findAll();
        response.send(roles);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};
