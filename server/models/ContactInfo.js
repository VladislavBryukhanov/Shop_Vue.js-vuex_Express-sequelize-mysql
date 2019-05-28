module.exports = (sequelize, DataTypes) => {
    const ContactInfo = sequelize.define('ContactInfo', {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        phone: {
            type: DataTypes.INTEGER,
            validate: {
                len: [4, 12],
                isNumeric: true
            },
            unique: {
                args: true,
                msg: 'Such phone already in use'
            },
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        // cities dropdown, zip code, etc ...
    });

    return ContactInfo;
};
