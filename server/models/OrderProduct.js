module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define('OrderProduct', {});

    OrderProduct.associate = (models) => {
        OrderProduct.belongsTo(models.Order);
        OrderProduct.belongsTo(models.Product);
    };

    return OrderProduct;
};
