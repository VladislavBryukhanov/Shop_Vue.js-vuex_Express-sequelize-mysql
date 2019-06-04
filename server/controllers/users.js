const { Role, User, Sequelize } = require('../models');

module.exports.fetchUsers = async (request, response) => {
    try {
        const users = await User.findAndCountAll({
            ...request.paging,
            where: { id: { [Sequelize.Op.notIn]: [request.user.id] } }, // exclude self
            order: [['createdAt', 'DESC']],
            include: [
                { model: Role }
            ],
            attributes: { exclude: ['RoleId'] }
        });
        response.send(users);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};

module.exports.updateRole = async (request, response) => {
    const { id } = request.params;
    const { role } = request.body;

    try {
        const RoleId = await Role.findOne({ where: { id: role.id } })
            .then(res => res.id);

        const [ res ] = await User.update({ RoleId }, { where: {id} });

        if (!res) {
            response
                .status(400)
                .send('Invalid role or user selected');
        }

        response.sendStatus(204);
    } catch (err) {
        response
            .status(500)
            .send(err.message);
    }
};
