module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
    });

    Chat.associate = (models) => {
        Chat.belongsTo(models.User);
        Chat.hasMany(models.Message);
    };

    return Chat;
};
