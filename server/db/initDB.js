const User = require('./models/User');
const Role = require('./models/Role');
const ContactInfo = require('./models/ContactInfo');
const Session = require('./models/Session');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

const initDefaultValues = () => {
    Category.bulkCreate([
        { name: 'Tablet' },
        { name: 'Computers'},
        { name: 'Smartphones'},
        { name: 'Fastfood'},
        { name: 'Fruits' },
        { name: 'Vegetables' },
        { name: 'Clothes' },
        { name: 'Decorations'},
        { name: 'Art' }
    ]);
  /*  Role.bulkCreate([
        { name: 'User' },
        { name: 'Manager' },
        { name: 'Admin' },
    ])*/
};

module.exports = async (force) => {

    //TODO replace to `association` for each model

    // await Role.sync(force);
    await User.sync(force);
    await Session.sync(force);
    await Category.sync(force);
    Product.belongsTo(Category);
    Category.hasMany(Product);
    await Product.sync(force);
    await Cart.sync(force);

    // FIXME
    User.belongsToMany(Product, {
        through: Cart,
    });

    // initDefaultValues();

/*    Promise.all([
       User.sync(force),
   // ContactInfo.sync(force);
       Session.sync(force),
       Category.sync(force),
       Product.sync(force),
    ]).then(() => {
        Product.hasOne(Category);
        initDefaultValues();
    });*/
};
