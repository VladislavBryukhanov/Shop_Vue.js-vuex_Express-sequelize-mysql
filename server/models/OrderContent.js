module.exports = (sequelize, DataTypes) => {
    const OrderContent = sequelize.define('OrderContent', {
        OrderId: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            references: {
                model: 'Orders',
                key: 'id'
            }
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        }
    });

    OrderContent.associate = (models) => {
        OrderContent.belongsTo(models.Product, {
            onDelete: 'cascade'
        });
    };

    return OrderContent;
};
