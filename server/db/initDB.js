const User = require('./models/User');
const Role = require('./models/Role');
const ContactInfo = require('./models/ContactInfo');
const Session = require('./models/Session');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const OrderContent = require('./models/OrderContent');

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
        { name: 'Art' },
        { name: 'Business' }
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
    await Session.sync(force);
    await ContactInfo.sync(force);
    await User.sync(force);
    User.hasOne(ContactInfo, {
        onDelete: 'cascade'
    });
    await Category.sync(force);
    Product.belongsTo(Category);
    Category.hasMany(Product,{
        onDelete: 'cascade'
    });
    await Product.sync(force);
    // FIXME
    User.belongsToMany(Product, {
        through: Cart,
        inverse: 'Product'
    });
    await Cart.sync(force);

    User.hasMany(Order, {
        onDelete: 'cascade'
    });
    Order.belongsTo(User);
    Order.hasMany(OrderContent, {
        onDelete: 'cascade'
    });
    OrderContent.belongsTo(Product, {
        onDelete: 'cascade'
    });

    await Order.sync(force);
    await OrderContent.sync(force);

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
