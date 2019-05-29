module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User);
        Order.hasMany(models.OrderContent, {
            onDelete: 'cascade'
        });
    };

    return Order;
};
