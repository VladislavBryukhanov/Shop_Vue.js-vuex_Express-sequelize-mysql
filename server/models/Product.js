module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                len: [1, 64]
            }
        },
        description: {
            type: DataTypes.TEXT,
            validation: {
                len: [1, 512]
            }
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validation: {
                min: 0
            }
        },
        previewPhoto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // categoryId: {
        //     type: DataTypes.INTEGER,
        //     foreignKey: true,
        //     allowNull: false,
        //     references: {
        //         model: 'Categories',
        //         key: 'id'
        //     }
        // }
    });

    Product.associate = (models) => {
        Product.belongsTo(models.Category);
    };

    return Product;
};
