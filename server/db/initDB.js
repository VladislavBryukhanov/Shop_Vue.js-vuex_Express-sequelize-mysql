const User = require('./models/User');
const Role = require('./models/Role');
const ContactInfo = require('./models/ContactInfo');
const Session = require('./models/Session');
const Category = require('./models/Category');
const Product = require('./models/Product');

const initDefaultValues = () => {
    Category.bulkCreate([
        { name: 'Tablet' },
        { name: 'Computers'},
        { name: 'Smartphones'},
        { name: 'Fastfood'},
        { name: 'Fruits' },
        { name: 'Vegetables' },
        { name: 'Clothes' }
    ]);
  /*  Role.bulkCreate([
        { name: 'User' },
        { name: 'Manager' },
        { name: 'Admin' },
    ])*/
};

module.exports = async (force) => {

    // await Role.sync(force);
    await User.sync(force);
    await Session.sync(force);
    await Category.sync(force);
    // Product.hasOne(Category);
    await Product.sync(force);
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
