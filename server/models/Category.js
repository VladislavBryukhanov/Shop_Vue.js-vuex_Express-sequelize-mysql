module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'This category already exists'
            },
            allowNull: false,
        }
    });

    Category.associate = (models) => {
        Category.hasMany(models.Product,{
            onDelete: 'cascade'
        });
    };

    return Category;
};
